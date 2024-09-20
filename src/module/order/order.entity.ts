import { IsNotEmpty, IsString ,IsNumber} from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  @IsString()
  title: string | null = null

  @Column('integer')
  @IsNumber()
  @IsNotEmpty()
  place!: number

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  item!: string

  @Column('date')
  limit:Date | null = null

  @Column('varchar')
  @IsString()
  description: string | null = null

  @Column('date')
  @IsNotEmpty()
  createdAt!:Date

  @Column('integer')
  @IsNumber()
  @IsNotEmpty()
  user_id!:number
}