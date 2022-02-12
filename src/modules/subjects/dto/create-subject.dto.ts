import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsString()
  @Length(0, 1024)
  description?: string

  @IsString()
  @IsNotEmpty()
  groupNumber: string
}
