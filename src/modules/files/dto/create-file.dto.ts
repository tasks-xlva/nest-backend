import { IsNotEmpty } from 'class-validator'

export class CreateFileDto {
  @IsNotEmpty()
  file: File
}
