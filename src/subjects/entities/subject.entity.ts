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
import { Group } from '@/groups/entities/group.entity'
import { ApiHideProperty } from '@nestjs/swagger'
import { Task } from '@/tasks/entities/task.entity'

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
  groupNumber: string

  @HasMany(() => Task)
  tasks: Task[]

  @CreatedAt
  createdAt: string

  @UpdatedAt
  updatedAt: string
}
