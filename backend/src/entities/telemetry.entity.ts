import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class Telemetry {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    ts: Date;

    @Column()
    key: string;

    @Column('float')
    value: number; // Assuming numeric telemetry for now (or use string if mixed)

    @ManyToOne(() => Device, (device) => device.telemetry, { onDelete: 'CASCADE' })
    device: Device;
}
