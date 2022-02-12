import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Subject } from 'modules/subjects/subject.entity'

import { Group } from './group.entity'
import { GroupsController } from './groups.controller'
import { GroupsService } from './groups.service'

@Module({
  imports: [SequelizeModule.forFeature([Group, Subject])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
