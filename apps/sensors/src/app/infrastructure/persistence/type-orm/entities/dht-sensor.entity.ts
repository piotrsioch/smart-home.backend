import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DhtSensorEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    temperature: string;

    @Column()
    humidity: string;
}