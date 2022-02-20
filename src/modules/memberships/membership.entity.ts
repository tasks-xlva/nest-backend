import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import {
  Table,
  Column,
  Model,
  ForeignKey,
  Default,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript'

import { Group } from 'modules/groups/group.entity'
import { User } from 'modules/users/user.entity'

export enum Role {
  Admin = `ADMIN`,
  Member = `MEMBER`,
  Editor = `EDITOR`,
}

@Table
export class Membership extends Model {

  @ApiHideProperty()
  @ForeignKey(() => Group)
  @Column
  @Exclude()
  groupId: number

  @ApiHideProperty()
  @ForeignKey(() => User)
  @Column
  @Exclude()
  userId: number

  @BelongsTo(() => User)
  user: User

  @AllowNull(false)
  @Default(Role.Member)
  @Column
  role: Role
}
