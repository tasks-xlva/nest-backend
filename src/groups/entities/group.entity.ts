import {
  Table,
  Column,
  PrimaryKey,
  Model,
  AllowNull,
  HasMany,
} from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Subject } from '@/subjects/entities/subject.entity'

@Table
export class Group extends Model {
  @PrimaryKey
  @Column
  number: string

  @AllowNull(false)
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: `uuid`,
  })
  uuid: string

  @HasMany(() => Subject)
  subjects: Subject[]
}
