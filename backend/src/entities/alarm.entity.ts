import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class Alarm {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdTime: number;

    @Column()
    severity: string; // Critical, Major, Minor, Warning

    @Column()
    type: string;

    @Column()
    status: string; // Active, Cleared, Acknowledged

    @Column()
    message: string;

    @ManyToOne(() => Device, (device) => device.alarms, { onDelete: 'CASCADE' })
    device: Device;
}
