import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common'
import { SubjectsService } from './subjects.service'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { UpdateSubjectDto } from './dto/update-subject.dto'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { Subject } from './entities/subject.entity'

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto)
  }

  @Get()
  @ApiQuery({ name: 'group', type: 'string', required: false })
  findAll(@Query('group') group) {
    return this.subjectsService.findAll(group)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Subject(await this.subjectsService.findOne(+id))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(+id, updateSubjectDto)
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(+id)
  }
}
