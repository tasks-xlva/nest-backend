import { ApiHideProperty } from '@nestjs/swagger'
import {
  Column,
  Table,
  Length,
  ForeignKey,
  Model,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript'

import { Group } from 'modules/groups/group.entity'
import { Task } from 'modules/tasks/task.entity'

@Table
export class Subject extends Model {
  @Column
  name: string

  @Length({ max: 1024 })
  @Column
  description?: string

  @ApiHideProperty()
  @ForeignKey(() => Group)
  @Column
  groupId: number

  @HasMany(() => Task)
  tasks: Task[]

  @CreatedAt
  createdAt: string

  @UpdatedAt
  updatedAt: string
}
