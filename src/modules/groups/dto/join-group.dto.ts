import { IsNotEmpty, IsString } from 'class-validator'

export class JoinGroupDto {
  @IsString()
  @IsNotEmpty()
  uuid: string
}
