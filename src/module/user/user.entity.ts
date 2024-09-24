import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Request } from '../request/request.entity'
import { Item } from '../item/item.entity'

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
  icon_image_url: string | null = null

  @Column("date")
  created_at!: Date

  @Column("date")
  updated_at!: Date

  @OneToMany(() => Request, (request) => request.user)
  requests!: Request[]

  @OneToMany(() => Item, (item) => item.user)
  items!: Item[]
}