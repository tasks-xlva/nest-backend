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
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard'

import { CreateSubjectDto } from './dto/create-subject.dto'
import { UpdateSubjectDto } from './dto/update-subject.dto'
import { SubjectsService } from './subjects.service'

@Controller(`subjects`)
@ApiTags(`subjects`)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto)
  }

  @Get()
  @ApiQuery({ name: `group`, type: `string`, required: false })
  findAll(@Query(`group`) group) {
    return this.subjectsService.findAll(group)
  }

  @Get(`:id`)
  async findOne(@Param(`id`) id: string) {
    return await this.subjectsService.findOne(+id)
  }

  @Patch(`:id`)
  update(@Param(`id`) id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(+id, updateSubjectDto)
  }

  @Delete(`:id`)
  @HttpCode(204)
  remove(@Param(`id`) id: string) {
    return this.subjectsService.remove(+id)
  }
}
