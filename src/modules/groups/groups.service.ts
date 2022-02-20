import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Membership, Role } from 'modules/memberships/membership.entity'
import { Subject } from 'modules/subjects/subject.entity'
import { User } from 'modules/users/user.entity'

import { CreateGroupDto } from './dto/create-group.dto'
import { JoinGroupDto } from './dto/join-group.dto'
import { FlatGroup, Group } from './group.entity'

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group)
    private groupsModel: typeof Group,

    @InjectModel(Subject)
    private subjectsModel: typeof Subject,

    @InjectModel(Membership)
    private membershipsModel: typeof Membership,

    @InjectModel(User)
    private usersModel: typeof User,
  ) {}

  async create(createGroupDto: CreateGroupDto, user: User) {
    const group = await this.groupsModel.create<FlatGroup>({
      ...createGroupDto,
    })
    await this.membershipsModel.create({
      groupId: group.id,
      userId: user.id,
      role: Role.Admin,
    })
    return group
  }

  findAll() {
    return this.groupsModel.findAll<FlatGroup>()
  }

  findOne(number: string) {
    return this.groupsModel.findOne({
      where: { number },
      include: this.subjectsModel,
    })
  }

  async findAllMemberships(number: string) {
    const group = await this.findOne(number)
    return this.membershipsModel.findAll({
      where: { groupId: group.id },
      include: this.usersModel,
    })
  }

  async join({ uuid }: JoinGroupDto, user: User) {
    const group = await this.groupsModel.findOne({ where: { uuid } })

    if (!group) {
      throw new BadRequestException(`Provided group doesn't exist`)
    }

    return this.membershipsModel.create({
      groupId: group.id,
      userId: user.id,
      role: Role.Admin,
    })
  }
}
