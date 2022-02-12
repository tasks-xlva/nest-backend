import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard'

import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TasksService } from './tasks.service'

@Controller(`tasks`)
@ApiTags(`tasks`)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto)
  }

  @Get()
  @ApiQuery({ name: `subject`, type: `number`, required: false })
  findAll(@Query(`subject`) subject) {
    return this.tasksService.findAll(subject)
  }

  @Get(`:id`)
  findOne(@Param(`id`, ParseIntPipe) id: number) {
    return this.tasksService.findOne(+id)
  }

  @Patch(`:id`)
  update(
    @Param(`id`, ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(+id, updateTaskDto)
  }

  @Delete(`:id`)
  @HttpCode(204)
  remove(@Param(`id`, ParseIntPipe) id: number) {
    return this.tasksService.remove(+id)
  }
}
