import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Request } from '../request/request.entity'
import { RoomUser } from '../roomuser/roomuser.entity'
import { Message } from '../message/message.entity'

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id!: String

    @Column("date")
    createdAt!: Date

    @Column({default:false})
    isClosed!: boolean

    @ManyToOne(() => Request, (request) => request.rooms)
    request!: Request

    @OneToMany(() => RoomUser, (roomuser) => roomuser.room)
    roomusers!: RoomUser[]

    @OneToMany(() => Message, (message) => message.room)
    messages!: Message[]
}