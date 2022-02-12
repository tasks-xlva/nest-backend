import { Column, Table, Length, ForeignKey, Model } from 'sequelize-typescript'
import { Group } from '@/groups/entities/group.entity'
import { ApiHideProperty } from '@nestjs/swagger'

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
}
