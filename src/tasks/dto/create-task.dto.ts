import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @Length(0, 1024)
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  deadline?: string

  @IsNumber()
  @IsNotEmpty()
  subject: number
}