import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from '../entities/alarm.entity';
import { Device } from '../entities/device.entity';

@Injectable()
export class AlarmsService {
    constructor(
        @InjectRepository(Alarm)
        private alarmsRepository: Repository<Alarm>,
    ) { }

    async create(device: Device, type: string, severity: string, message: string): Promise<Alarm> {
        const alarm = this.alarmsRepository.create({
            device,
            type,
            severity,
            message,
            status: 'Active',
            createdTime: Date.now(),
        });
        return this.alarmsRepository.save(alarm);
    }

    async findAll(): Promise<Alarm[]> {
        return this.alarmsRepository.find({
            relations: ['device'],
            order: { createdTime: 'DESC' }
        });
    }

    async findByDevice(deviceId: string): Promise<Alarm[]> {
        return this.alarmsRepository.find({
            where: { device: { id: deviceId } },
            order: { createdTime: 'DESC' },
        });
    }

    async clear(id: string): Promise<void> {
        await this.alarmsRepository.update(id, { status: 'Cleared' });
    }

    async acknowledge(id: string): Promise<void> {
        await this.alarmsRepository.update(id, { status: 'Acknowledged' });
    }
}
