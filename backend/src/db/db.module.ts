import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from '../entities/device.entity';
import { Telemetry } from '../entities/telemetry.entity';
import { Alarm } from '../entities/alarm.entity';
import { User } from '../entities/user.entity';
import { Asset } from '../entities/asset.entity';
import { Dashboard } from '../entities/dashboard.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'scadaiot',
            password: 'scadaiot123',
            database: 'scadaiot',
            entities: [Device, Telemetry, Alarm, User, Asset, Dashboard],
            synchronize: true, // Auto-create tables (dev only)
        }),
    ],
})
export class DbModule { }
