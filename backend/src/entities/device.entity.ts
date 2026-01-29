import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Telemetry } from './telemetry.entity';
import { Alarm } from './alarm.entity';

@Entity()
export class Device {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdTime: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({ nullable: true })
    label: string;

    @Column({ unique: true })
    accessToken: string;

    @OneToMany(() => Telemetry, (telemetry) => telemetry.device)
    telemetry: Telemetry[];

    @OneToMany(() => Alarm, (alarm) => alarm.device)
    alarms: Alarm[];
}
