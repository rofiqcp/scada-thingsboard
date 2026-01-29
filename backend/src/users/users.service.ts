import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'admin',
            password: 'password', // In production, use bcrypt
            roles: ['ADMIN'],
        },
        {
            userId: 2,
            username: 'user',
            password: 'password',
            roles: ['USER'],
        }
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
