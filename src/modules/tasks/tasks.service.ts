import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { Subject } from 'modules/subjects/subject.entity'

import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private tasksModel: typeof Task,

    @InjectModel(Subject)
    private subjectsModel: typeof Subject,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const subject = await this.subjectsModel.findOne({
      where: { id: createTaskDto.subjectId },
    })

    if (!subject) {
      throw new NotFoundException(`Provided subject not found`)
    }

    return this.tasksModel.create({
      ...createTaskDto,
      subjectId: subject.id,
    })
  }

  async findAll({
    subject: subjectId,
    search,
  }: {
    subject?: number
    search?: string
  }): Promise<Task[]> {
    const query: {
      name?: Record<string, string>
      subjectId?: number
    } = {}

    if (subjectId) {
      query.subjectId = subjectId
    }

    if (search) {
      query.name = { [Op.iLike]: `%${search}%` }
    }

    return this.tasksModel.findAll({ where: query })
  }

  findOne(id: number): Promise<Task> {
    return this.tasksModel.findOne({ where: { id } })
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.tasksModel.update({ ...updateTaskDto }, { where: { id } })
  }

  async remove(id: number): Promise<void> {
    await this.tasksModel.truncate({ where: { id } })
  }
}
