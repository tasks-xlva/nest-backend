import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { Task } from 'modules/tasks/entities/task.entity'
import { Subject } from 'modules/subjects/entities/subject.entity'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [SequelizeModule.forFeature([Task, Subject])],
  exports: [SequelizeModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
