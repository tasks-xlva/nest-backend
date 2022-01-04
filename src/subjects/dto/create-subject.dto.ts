import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @Length(0, 1024)
  description?: string

  @IsString()
  @IsNotEmpty()
  group: string
}
