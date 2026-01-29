import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Telemetry } from '../entities/telemetry.entity';
import { Device } from '../entities/device.entity';

@Injectable()
export class TelemetryService {
    constructor(
        @InjectRepository(Telemetry)
        private telemetryRepository: Repository<Telemetry>,
    ) { }

    async saveTelemetry(device: Device, data: Record<string, any>, ts: number = Date.now()): Promise<void> {
        const telemetryItems = Object.entries(data).map(([key, value]) => {
            if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
                return this.telemetryRepository.create({
                    device,
                    key,
                    value: Number(value), // Assuming numeric for now, might need better handling
                    ts: new Date(ts),
                });
            }
            return null;
        }).filter(item => item !== null);

        if (telemetryItems.length > 0) {
            await this.telemetryRepository.save(telemetryItems);
        }
    }

    async getLatestTelemetry(deviceId: string): Promise<Record<string, any>> {
        // This is a simplified implementation. Efficient latest telemetry retrieval usually involves specific SQL queries or caching.
        // Doing a simple per-key query for now.
        const keys = await this.telemetryRepository
            .createQueryBuilder('telemetry')
            .select('DISTINCT key')
            .where('telemetry.deviceId = :deviceId', { deviceId })
            .getRawMany();

        const result: Record<string, any> = {};

        for (const k of keys) {
            const latest = await this.telemetryRepository.findOne({
                where: { device: { id: deviceId }, key: k.key },
                order: { ts: 'DESC' },
            });
            if (latest) {
                result[latest.key] = latest.value;
            }
        }
        return result;
    }

    async getTelemetryHistory(deviceId: string, keys: string[], startTs: number, endTs: number): Promise<Telemetry[]> {
        return this.telemetryRepository
            .createQueryBuilder('telemetry')
            .where('telemetry.deviceId = :deviceId', { deviceId })
            .andWhere('telemetry.key IN (:...keys)', { keys })
            .andWhere('telemetry.ts >= :startTs', { startTs: new Date(startTs) })
            .andWhere('telemetry.ts <= :endTs', { endTs: new Date(endTs) })
            .orderBy('telemetry.ts', 'ASC')
            .getMany();
    }
}
