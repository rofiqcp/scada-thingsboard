import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (!user || !(await bcrypt.compare(pass, user.passwordHash))) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.email, roles: [user.role] };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                username: user.email,
                roles: [user.role],
                firstName: user.firstName,
                lastName: user.lastName
            }
        };
    }
}
