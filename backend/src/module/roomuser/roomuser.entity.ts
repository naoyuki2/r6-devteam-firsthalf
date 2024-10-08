import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../user/user.entity'
import { Room } from '../room/room.entity'

export enum role{
    requester = "requester",
    carrier ="carrier"
}

@Entity()
export class RoomUser {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: "varchar",
        enum: role,
    })
    role!: role

    @ManyToOne(() => Room, (room) => room.roomusers)
    room!: Room

    @ManyToOne(() => User, (user) => user.roomusers)
    user!: User
}