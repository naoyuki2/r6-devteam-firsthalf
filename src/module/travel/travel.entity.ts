import { IsNotEmpty, IsString , IsNumber} from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Travel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  @IsString()
  title: string | null = null

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  fast!: string

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  second!: string

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  third!: string

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  purpose: string  | null = null

  @Column('date')
  start_day:Date | null = null

  @Column('date')
  end_day:Date | null = null

  @Column('integer')
  @IsNumber()
  @IsNotEmpty()
  user_id!:number
}