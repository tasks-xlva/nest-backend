import { Module } from '@nestjs/common'
import { GroupsService } from './groups.service'
import { GroupsController } from './groups.controller'
import { Group } from './entities/group.entity'
import { SequelizeModule } from '@nestjs/sequelize'
import { Subject } from '@/subjects/entities/subject.entity'

@Module({
  imports: [SequelizeModule.forFeature([Group, Subject])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
