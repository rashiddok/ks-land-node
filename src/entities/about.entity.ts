import { Image } from "src/models/Image";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class About{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    photo: string;

    @Column({unique: true, nullable: false})
    text: string;
}