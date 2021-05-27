import {PrimaryGeneratedColumn, Column, Entity} from "typeorm";

@Entity()
export class LogEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    timestamp!: string;
  
    @Column()
    activity!: string;
}