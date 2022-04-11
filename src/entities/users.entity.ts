import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: false, nullable: false })
  password: string;

}
