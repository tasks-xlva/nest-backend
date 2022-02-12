import { ApiHideProperty } from '@nestjs/swagger'
import { Subject } from 'modules/subjects/entities/subject.entity'
import {
  AllowNull,
  Column,
  ForeignKey,
  Length,
  Model,
  Table,
} from 'sequelize-typescript'

@Table
export class Task extends Model {
  @AllowNull(false)
  @Column
  name: string

  @Length({ max: 1023 })
  @Column
  description?: string

  @Column
  deadline?: Date

  @ApiHideProperty()
  @ForeignKey(() => Subject)
  subjectId: number
}
