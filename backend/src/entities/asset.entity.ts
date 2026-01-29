import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Asset {
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
}

@Entity()
export class Dashboard {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdTime: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column('jsonb', { nullable: true })
    configuration: any;
}
