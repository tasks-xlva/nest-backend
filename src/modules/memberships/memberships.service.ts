import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { User } from 'modules/users/user.entity'

import { UpdateMembershipDto } from './dto/update-membership.dto'
import { Membership } from './membership.entity'

@Injectable()
export class MembershipsService {
  constructor(
    @InjectModel(Membership)
    private membershipsModel: typeof Membership,

    @InjectModel(User)
    private usersModel: typeof User,
  ) {}

  findOne(id: number) {
    return this.membershipsModel.findOne({
      where: { id },
      include: this.usersModel,
    })
  }

  async update(id: number, updateMembershipDto: UpdateMembershipDto) {
    return (await this.findOne(id)).update({ ...updateMembershipDto })
  }

  remove(id: number) {
    return this.membershipsModel.truncate({ where: { id } })
  }
}
