import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { UpdateSubjectDto } from './dto/update-subject.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Subject } from './entities/subject.entity'
import { Group } from '@/groups/entities/group.entity'

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject)
    private subjectsModel: typeof Subject,

    @InjectModel(Group)
    private groupsModel: typeof Group,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const group = await this.groupsModel.findOne({
      where: { group: createSubjectDto.group },
    })

    if (!group) {
      throw new NotFoundException('Provided group not found')
    }

    return this.subjectsModel.create({
      ...createSubjectDto,
      group,
    })
  }

  async findAll(groupNumber?: string): Promise<Subject[]> {
    return groupNumber
      ? this.subjectsModel.findAll({ where: { groupNumber } })
      : this.subjectsModel.findAll()
  }

  findOne(id: number): Promise<Subject> {
    return this.subjectsModel.findOne({ where: { id } })
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsModel.update(updateSubjectDto, { where: { id } })
  }

  async remove(id: number): Promise<void> {
    await this.subjectsModel.truncate({ where: { id } })
  }
}
