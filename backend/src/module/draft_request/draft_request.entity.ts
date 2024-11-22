import { IsNotEmpty, IsString } from 'class-validator'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Room } from '../room/room.entity'
import { DraftItem } from '../draft_item/draft_item.entity'

export type status = 'pending' | 'agreed' |'received'| 'completed'
@Entity()
export class DraftRequest {
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
  delivery_details: string | null = null

  @Column('text')
  @IsString()
  description!: string

  @Column({
    type: 'varchar',
    default: 'pending',
  })
  status!: status

  @Column({ default: false })
  action!: boolean

  @CreateDateColumn({
    update: false,
  })
  created_at!: Date

  @UpdateDateColumn({
    update: true,
  })
  updated_at!: Date

  @Column('date', { nullable: true })
  completed_at: Date | null = null

  @ManyToOne(() => Room, (room) => room.draft_requests)
  @IsNotEmpty()
  room!: Room

  @OneToMany(() => DraftItem, (draft_item) => draft_item.draft_request, {
    cascade: true,
  })
  draft_items!: DraftItem[]
}
