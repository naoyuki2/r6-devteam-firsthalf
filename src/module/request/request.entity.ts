import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../user/user.entity'

export enum status {
    pending = "pending",
    progress = "progress",
    completed = "completed"
}

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column('varchar')
    @IsString()
    @IsNotEmpty()
    title!: string

    @Column("varchar")
    @IsString()
    location_prefecture!: string

    @Column("varchar")
    @IsString()
    location_details!: string
    
    @Column("varchar")
    @IsString()
    delivery_location: string | null = null

    @Column("date")
    delivery_date: Date | null = null

    @Column("text")
    @IsString()
    description!: String

    @Column({
        type: "varchar",
        enum: status,
        default: status.pending
    })
    status!: status

    @ManyToOne(() => User, (user) => user.requests)
    user!: User

    @Column("date")
    createdAt!: Date

    @Column("date")
    updated_at!: Date

    @Column("date")
    completed_at: Date | null = null
}