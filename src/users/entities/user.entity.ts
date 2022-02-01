import { Column, Entity, PrimaryColumn } from 'typeorm'
import { ApiHideProperty } from '@nestjs/swagger'

@Entity()
export class User {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @PrimaryColumn()
  email: string

  @ApiHideProperty()
  @Column()
  password: string
}
