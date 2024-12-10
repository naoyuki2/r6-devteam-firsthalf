import { IsNotEmpty, IsString } from 'class-validator'
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm'

import { User } from '../user/user.entity'

export type type = 'room' | 'message'

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  @IsString()
  body!: string

  @Column('varchar')
  type!: type

  @CreateDateColumn({
    update: false,
  })
  created_at!: Date

  @Column()
  roomId!: string

  @Column({
    type: 'boolean',
    default: false,
  })
  isRead!: boolean

  @ManyToOne(() => User, (user) => user.notifications)
  @IsNotEmpty()
  user!: User
}
