import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Request } from '../request/request.entity'
import { RoomUser } from '../roomuser/roomuser.entity'
import { Message } from '../message/message.entity'

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

  @CreateDateColumn({
    update: true,
  })
  updated_at!: Date

  @OneToMany(() => Request, (request) => request.user)
  requests!: Request[]

  @OneToMany(() => RoomUser, (roomuser) => roomuser.user)
  roomusers!: RoomUser[]

  @OneToMany(() => Message, (message) => message.user)
  messages!: Message[]
}
