import { IsNotEmpty, IsString } from 'class-validator'

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  number: string
}
