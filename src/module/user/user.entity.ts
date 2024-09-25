import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Request } from '../request/request.entity'

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
  @ValidateIf((o) => o.iconImageUrl !== null)
  @IsString()
  icon_image_url: string | null = null

  @CreateDateColumn({
    update: false,
  })
  created_at!: Date

  @CreateDateColumn({
    update: true,
  })
  updated_at!: Date

  @OneToMany(() => Request, (request) => request.user)
  requests!: Request[]
}
