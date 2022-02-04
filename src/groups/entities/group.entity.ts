import { Entity, PrimaryColumn, Column, Generated } from 'typeorm'

@Entity()
export class Group {
  @PrimaryColumn()
  number: string

  @Column({ type: 'uuid' })
  @Generated('uuid')
  uuid: string
}
