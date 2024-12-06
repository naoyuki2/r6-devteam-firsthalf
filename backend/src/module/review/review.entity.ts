import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IsNotEmpty, IsString } from 'class-validator'

import { User } from '../user/user.entity'
export type role = 'requester' | 'carrier'

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, (user) => user.send_users)
  send_user!: User

  @ManyToOne(() => User, (user) => user.receive_users)
  receive_user!: User

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  send_role!: role

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
