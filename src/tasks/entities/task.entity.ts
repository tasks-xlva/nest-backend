import { ApiHideProperty } from '@nestjs/swagger'
import { Subject } from '@/subjects/entities/subject.entity'
import {
  AllowNull,
  Column,
  ForeignKey,
  Length,
  Model,
  Table,
} from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table
export class Task extends Model {
  @AllowNull(false)
  @Column
  name: string

  @Length({ max: 1023 })
  @Column
  description?: string

  @Column({ type: DataTypes.TIME })
  deadline?: string

  @ApiHideProperty()
  @ForeignKey(() => Subject)
  subjectId: number
}
