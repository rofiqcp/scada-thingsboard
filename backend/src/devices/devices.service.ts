import { Injectable, NotFoundException } from '@nestjs/common';

export interface Device {
    id: string;
    name: string;
    type: string;
    label?: string;
    createdTime: number;
}

@Injectable()
export class DevicesService {
    private devices: Device[] = [];

    create(device: Omit<Device, 'id' | 'createdTime'>): Device {
        const newDevice = {
            ...device,
            id: Math.random().toString(36).substring(7),
            createdTime: Date.now(),
        };
        this.devices.push(newDevice);
        return newDevice;
    }

    findAll(): Device[] {
        return this.devices;
    }

    findOne(id: string): Device {
        const device = this.devices.find(d => d.id === id);
        if (!device) {
            throw new NotFoundException(`Device with ID ${id} not found`);
        }
        return device;
    }

    remove(id: string): void {
        this.devices = this.devices.filter(d => d.id !== id);
    }
}
