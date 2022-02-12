import { Column, Model, Table, AllowNull } from 'sequelize-typescript'
import { ApiHideProperty } from '@nestjs/swagger'

@Table
export class User extends Model {
  @AllowNull(false)
  @Column
  firstName: string

  @AllowNull(false)
  @Column
  lastName: string

  @AllowNull(false)
  @Column({ unique: `email` })
  email: string

  @ApiHideProperty()
  @AllowNull(false)
  @Column
  password: string
}
