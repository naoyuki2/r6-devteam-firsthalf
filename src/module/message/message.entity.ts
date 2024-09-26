import { IsNotEmpty, IsString } from 'class-validator'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Room } from '../room/room.entity'
import { User } from '../user/user.entity'


@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("text")
    body!: String

    @Column("date")
    createdAt!: Date

    @ManyToOne(() => Room, (room) => room.messages)
    room!: Room

    @ManyToOne(() => User, (user) => user.messages)
    user!: User
}