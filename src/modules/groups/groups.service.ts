import { Injectable } from '@nestjs/common'
import { CreateGroupDto } from './dto/create-group.dto'
import { Group } from './entities/group.entity'
import { InjectModel } from '@nestjs/sequelize'
import { Subject } from 'modules/subjects/entities/subject.entity'

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
