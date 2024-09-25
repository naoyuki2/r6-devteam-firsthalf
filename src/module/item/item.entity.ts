import { IsNotEmpty, IsString } from 'class-validator'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Request } from '../request/request.entity'

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column('varchar')
    @IsString()
    @IsNotEmpty()
    name!: string

    @Column("int")
    quantity!: number

    @Column("int")
    price!: number

    @ManyToOne(() => Request, (request) => request.items)
    request!: Request
}