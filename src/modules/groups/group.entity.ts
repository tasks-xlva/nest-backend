import { ApiHideProperty } from '@nestjs/swagger'
import { DataTypes } from 'sequelize'
import { Table, Column, Model, AllowNull, HasMany } from 'sequelize-typescript'

import { Membership } from 'modules/memberships/membership.entity'
import { Subject } from 'modules/subjects/subject.entity'

export class FlatGroup extends Model {
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

@Table
export class Group extends FlatGroup {
  @HasMany(() => Subject)
  subjects: Subject[]

  @ApiHideProperty()
  @HasMany(() => Membership)
  memberships: Membership[]
}
