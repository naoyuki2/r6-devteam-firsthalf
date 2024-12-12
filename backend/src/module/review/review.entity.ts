import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IsNotEmpty, IsString } from 'class-validator'

import { User } from '../user/user.entity'
import { role } from '../room_user/room_user.entity'

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, (user) => user.send_users)
  send_user!: User

  @ManyToOne(() => User, (user) => user.receive_users)
  receive_user!: User

  @Column({
    type: 'varchar',
    enum: role,
  })
  @IsString()
  @IsNotEmpty()
  send_user_role!: role

  @Column('text')
  @IsString()
  @IsNotEmpty()
  body!: string

  @Column('boolean', { default: false })
  @IsNotEmpty()
  isGood!: boolean

  @CreateDateColumn({
    update: false,
  })
  created_at!: Date
}
