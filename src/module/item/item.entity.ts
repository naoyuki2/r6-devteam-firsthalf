import { IsNotEmpty, IsString } from 'class-validator'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../user/user.entity'

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

    @ManyToOne(() => User, (user) => user.items)
    user!: User
}