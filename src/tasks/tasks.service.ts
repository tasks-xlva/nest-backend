import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './entities/task.entity'
import { Subject } from '@/subjects/entities/subject.entity'
import { InjectModel } from '@nestjs/sequelize'

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
      throw new NotFoundException('Provided subject not found')
    }

    return this.tasksModel.create({
      ...createTaskDto,
      subjectId: subject.id,
    })
  }

  async findAll(subjectId?: number): Promise<Task[]> {
    return subjectId
      ? this.tasksModel.findAll({ where: { subjectId } })
      : this.tasksModel.findAll()
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
