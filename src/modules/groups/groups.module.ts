import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Membership } from 'modules/memberships/membership.entity'
import { Subject } from 'modules/subjects/subject.entity'
import { User } from 'modules/users/user.entity'

import { Group } from './group.entity'
import { GroupsController } from './groups.controller'
import { GroupsService } from './groups.service'

@Module({
  imports: [SequelizeModule.forFeature([Group, Subject, Membership, User])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
