import {
  Column,
  Table,
  Length,
  ForeignKey,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript'
import { Group } from '@/groups/entities/group.entity'
import { ApiHideProperty } from '@nestjs/swagger'

@Table
export class Subject extends Model {
  @PrimaryKey
  @Column
  id: number

  @Column
  name: string

  @Length({ max: 1024 })
  @Column
  description?: string

  @ApiHideProperty()
  @ForeignKey(() => Group)
  @Column
  groupNumber: string

  @CreatedAt
  createdAt: string

  @UpdatedAt
  updatedAt: string
}
