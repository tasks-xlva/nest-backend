import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Group {
  @PrimaryColumn()
  number: string
}
