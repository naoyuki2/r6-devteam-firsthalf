import { IsNotEmpty, IsString } from 'class-validator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { DraftRequest } from '../draft_request/draft_request.entity'

@Entity()
export class DraftItem {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  name!: string

  @Column('int')
  quantity!: number

  @Column('int')
  price!: number

  @ManyToOne(() => DraftRequest, (draft_request) => draft_request.draft_items)
  draft_request!: DraftRequest
}
