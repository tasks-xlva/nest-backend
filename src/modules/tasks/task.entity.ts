import { ApiHideProperty } from '@nestjs/swagger'
import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Length,
  Model,
  Table,
} from 'sequelize-typescript'

import { Subject } from 'modules/subjects/subject.entity'

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

  @Column(DataType.ARRAY(DataType.TEXT))
  files: string[]
}
