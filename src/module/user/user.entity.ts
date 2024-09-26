import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @ValidateIf(o => o.iconImageUrl !== null)
  @IsString()
  icon_image_url: string | null = null

  @Column("date")
  created_at!: Date

  @Column("date")
  updated_at!: Date

  @OneToMany(() => Request, (request) => request.user)
  requests!: Request[]

  @OneToMany(() => RoomUser, (roomuser) => roomuser.user)
  roomusers!: RoomUser[]

  @OneToMany(() => Message, (message) => message.user)
  messages!: Message[]

}