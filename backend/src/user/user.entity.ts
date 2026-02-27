import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  Admin = 'Admin',
  Editor = 'Editor',
}

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: true,
  })
  role?: UserRole;
}