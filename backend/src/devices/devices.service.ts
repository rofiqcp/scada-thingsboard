import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../entities/device.entity';

@Injectable()
export class DevicesService {
    constructor(
        @InjectRepository(Device)
        private devicesRepository: Repository<Device>,
    ) { }

    async create(deviceDto: Partial<Device>): Promise<Device> {
        const accessToken = this.generateAccessToken();
        const newDevice = this.devicesRepository.create({
            ...deviceDto,
            accessToken,
        });
        return this.devicesRepository.save(newDevice);
    }

    async findAll(): Promise<Device[]> {
        return this.devicesRepository.find({ order: { createdTime: 'DESC' } });
    }

    async findOne(id: string): Promise<Device> {
        const device = await this.devicesRepository.findOne({ where: { id } });
        if (!device) {
            throw new NotFoundException(`Device with ID ${id} not found`);
        }
        return device;
    }

    async remove(id: string): Promise<void> {
        await this.devicesRepository.delete(id);
    }

    async findByAccessToken(accessToken: string): Promise<Device | null> {
        return this.devicesRepository.findOne({ where: { accessToken } });
    }

    private generateAccessToken(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 20; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}
