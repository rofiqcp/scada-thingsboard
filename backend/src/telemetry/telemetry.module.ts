import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetryGateway } from './telemetry.gateway';
import { TelemetryService } from './telemetry.service';
import { Telemetry } from '../entities/telemetry.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Telemetry])],
    providers: [TelemetryGateway, TelemetryService],
    exports: [TelemetryGateway, TelemetryService],
})
export class TelemetryModule { }
