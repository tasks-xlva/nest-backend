import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './entities/task.entity'
import { Repository } from 'typeorm'
import { Subject } from '@/subjects/entities/subject.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,

    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const subject = await this.subjectsRepository.findOne(createTaskDto.subject)

    if (!subject) {
      throw new NotFoundException('Provided subject not found')
    }

    return this.tasksRepository.findOne(
      await this.tasksRepository.save({
        ...createTaskDto,
        subject,
      }),
    )
  }

  async findAll(subjectId: number): Promise<Task[]> {
    const subject = await this.subjectsRepository.findOne(subjectId)

    if (subjectId && !subject) {
      throw new NotFoundException('Provided subject not found')
    }

    return subject
      ? this.tasksRepository.find({ subject })
      : this.tasksRepository.find()
  }

  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne(id)
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.findOne(
      await this.tasksRepository.save({ id, ...updateTaskDto }),
    )
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id)
  }
}
