import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Request } from '../request/request.entity'
import { RoomUser } from '../room_user/room_user.entity'
import { Message } from '../message/message.entity'
import { Notification } from '../notification/notification.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  name!: string

  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  password!: string

  @ValidateIf((o) => o.icon_image_url !== null)
  @IsString()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  icon_image_url: string | null = null

  @CreateDateColumn({
    update: false,
  })
  created_at!: Date

  @UpdateDateColumn({
    update: true,
  })
  updated_at!: Date

  @OneToMany(() => Request, (request) => request.user)
  requests!: Request[]

  @OneToMany(() => RoomUser, (room_user) => room_user.user)
  room_users!: RoomUser[]

  @OneToMany(() => Message, (message) => message.user)
  messages!: Message[]

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[]
}
