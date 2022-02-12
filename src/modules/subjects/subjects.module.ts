import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Group } from 'modules/groups/group.entity'
import { Task } from 'modules/tasks/task.entity'

import { Subject } from './subject.entity'
import { SubjectsController } from './subjects.controller'
import { SubjectsService } from './subjects.service'

@Module({
  imports: [SequelizeModule.forFeature([Subject, Group, Task])],
  exports: [SequelizeModule],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
