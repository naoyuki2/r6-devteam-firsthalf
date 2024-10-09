import { IsNotEmpty, IsString } from 'class-validator'
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

export type status = 'pending' | 'progress' | 'completed'
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
  @IsNotEmpty()
  location_prefecture!: string

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  location_details!: string

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  delivery_prefecture!: string

  @Column('varchar', { nullable: true })
  @IsString()
  @IsNotEmpty()
  delivery_details: string | null = null

  @Column('text')
  @IsString()
  description!: string

  @Column({
    type: 'varchar',
    default: 'pending',
  })
  @IsNotEmpty()
  status!: status

  @CreateDateColumn({
    update: false,
  })
  @IsNotEmpty()
  created_at!: Date

  @CreateDateColumn({
    update: true,
  })
  @IsNotEmpty()
  updated_at!: Date

  @Column('date', { nullable: true })
  @IsNotEmpty()
  completed_at: Date | null = null

  @ManyToOne(() => User, (user) => user.requests)
  @IsNotEmpty()
  user!: User

  @OneToMany(() => Item, (item) => item.request)
  items!: Item[]

  @OneToMany(() => Room, (room) => room.request)
  rooms!: Room[]
}