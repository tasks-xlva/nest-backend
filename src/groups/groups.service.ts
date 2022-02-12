import { Injectable } from '@nestjs/common'
import { CreateGroupDto } from './dto/create-group.dto'
import { Group } from './entities/group.entity'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group)
    private groupsModel: typeof Group,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    return await this.groupsModel.create({ ...createGroupDto })
  }

  findAll() {
    return this.groupsModel.findAll()
  }

  findOne(number: string) {
    return this.groupsModel.findOne({ where: { number } })
  }
}
