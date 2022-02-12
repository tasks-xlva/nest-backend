import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Subject } from 'modules/subjects/subject.entity'

import { Task } from './task.entity'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'


@Module({
  imports: [SequelizeModule.forFeature([Task, Subject])],
  exports: [SequelizeModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
