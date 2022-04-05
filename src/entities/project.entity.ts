import { Image } from "src/models/Image";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    shortTitle: string;

    @Column({unique: true, nullable: false})
    title: string;

    @Column({unique: true, nullable: false})
    description: string;

    @Column({unique: true, nullable: false})
    category: string;

    @Column({unique: true, nullable: false})
    files: string;

    @Column({unique: true, nullable: false})
    cover: string;
}