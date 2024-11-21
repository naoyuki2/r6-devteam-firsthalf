import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../user/user.entity'
import { Room } from '../room/room.entity'

export enum role {
  requester = 'requester',
  carrier = 'carrier',
}

@Entity()
export class RoomUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: 'varchar',
    enum: role,
  })
  role!: role

  @Column({
    type: 'boolean',
    default: false,
  })
  isAgreed!: boolean

  @Column({
    type: 'boolean',
    default: false,
  })
  isFeedback!: boolean

  @Column({
    type: 'boolean',
    default: false,
  })
  isReceive!: boolean

  @ManyToOne(() => Room, (room) => room.room_users)
  room!: Room

  @ManyToOne(() => User, (user) => user.room_users)
  user!: User
}
