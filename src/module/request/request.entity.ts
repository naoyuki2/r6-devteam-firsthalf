import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm'

import { User } from '../user/user.entity'
import { Item } from '../item/item.entity'
import { Room } from '../room/room.entity'

export enum status {
  pending = 'pending',
  progress = 'progress',
  completed = 'completed',
}

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  title!: string

  @Column('varchar')
  @IsString()
  location_prefecture!: string

  @Column('varchar')
  @IsString()
  location_details!: string

  @Column('varchar', { nullable: true })
  @IsString()
  delivery_location: string | null = null

  @Column('date', { nullable: true })
  delivery_date: Date | null = null

  @Column('text')
  @IsString()
  description!: String

  @Column({
    type: 'varchar',
    enum: status,
    default: status.pending,
  })
  status!: status

  @ManyToOne(() => User, (user) => user.requests)
  user!: User

  @CreateDateColumn({
    update: false,
  })
  created_at!: Date

  @OneToMany(() => Item, (item) => item.request)
  items!: Item[]

  @OneToMany(() => Room, (room) => room.request)
  rooms!: Room[]

  @CreateDateColumn({
    update: true,
  })
  updated_at!: Date

  @Column('date', { nullable: true })
  completed_at: Date | null = null
}
