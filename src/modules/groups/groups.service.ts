import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Subject } from 'modules/subjects/subject.entity'

import { CreateGroupDto } from './dto/create-group.dto'
import { Group } from './group.entity'

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group)
    private groupsModel: typeof Group,

    @InjectModel(Subject)
    private subjectsModel: typeof Subject,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    return await this.groupsModel.create({ ...createGroupDto })
  }

  findAll() {
    return this.groupsModel.findAll<Omit<Group, `subjects`>>()
  }

  findOne(number: string) {
    return this.groupsModel.findOne({
      where: { number },
      include: this.subjectsModel,
    })
  }
}
