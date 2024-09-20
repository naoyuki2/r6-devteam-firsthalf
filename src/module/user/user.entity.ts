import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  name!: string

  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  password!: string

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @ValidateIf(o => o.iconImageUrl !== null)
  @IsString()
  icon: string | null = null

}