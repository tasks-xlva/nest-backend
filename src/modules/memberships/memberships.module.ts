import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Group } from 'modules/groups/group.entity'
import { User } from 'modules/users/user.entity'

import { Membership } from './membership.entity'
import { MembershipsController } from './memberships.controller'
import { MembershipsService } from './memberships.service'

@Module({
  imports: [SequelizeModule.forFeature([Membership, Group, User])],
  exports: [SequelizeModule],
  controllers: [MembershipsController],
  providers: [MembershipsService],
})
export class MembershipsModule {}
