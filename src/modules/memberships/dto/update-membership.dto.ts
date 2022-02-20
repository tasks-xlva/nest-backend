import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

import { Role } from '../membership.entity'

export class UpdateMembershipDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(Role)
  role?: Role
}
