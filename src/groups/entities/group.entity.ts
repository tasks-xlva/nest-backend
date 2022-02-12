import {
  Table,
  Column,
  PrimaryKey,
  Model,
  AllowNull,
} from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

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
}
