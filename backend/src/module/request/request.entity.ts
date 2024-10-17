import { IsNotEmpty, IsString, ValidateIf } from 'class-validator'
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
  created_at!: Date

  @OneToMany(() => Item, (item) => item.request, { cascade: true })
  items!: Item[]

  @OneToMany(() => Room, (room) => room.request)
  rooms!: Room[]

  @CreateDateColumn({
    update: true,
  })
  updated_at!: Date

  @Column('date', { nullable: true })
  completed_at: Date | null = null

  @ManyToOne(() => User, (user) => user.requests)
  @IsNotEmpty()
  user!: User
}
