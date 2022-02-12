import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { UpdateSubjectDto } from './dto/update-subject.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Subject } from './entities/subject.entity'
import { Group } from 'modules/groups/entities/group.entity'
import { Task } from 'modules/tasks/entities/task.entity'

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject)
    private subjectsModel: typeof Subject,

    @InjectModel(Group)
    private groupsModel: typeof Group,

    @InjectModel(Task)
    private tasksModel: typeof Task,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const group = await this.groupsModel.findOne({
      where: { number: createSubjectDto.groupNumber },
    })

    if (!group) {
      throw new NotFoundException('Provided group not found')
    }

    return this.subjectsModel.create({
      ...createSubjectDto,
      group,
    })
  }

  async findAll(groupNumber?: string) {
    return groupNumber
      ? this.subjectsModel.findAll({ where: { groupNumber } })
      : this.subjectsModel.findAll()
  }

  async findOne(id: number) {
    return await this.subjectsModel.findOne({
      where: { id },
      include: this.tasksModel,
    })
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return (
      await this.subjectsModel.findOne({
        where: { id },
        include: this.tasksModel,
      })
    ).update(updateSubjectDto)
  }

  async remove(id: number): Promise<void> {
    await this.subjectsModel.destroy({ where: { id } })
  }
}
