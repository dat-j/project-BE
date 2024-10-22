import { Message } from 'src/message/entities/message.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:"https://i.pinimg.com/564x/29/b8/d2/29b8d250380266eb04be05fe21ef19a7.jpg"})
  avatarUrl?: string;

  @Column({default:"Nothing here!"})
  bio?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({default:""})
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  roleId?: number;

  @OneToMany(() => Message, message => message.user)
  messages: Message[];
}