import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from '@/tasks/entities/task.entity'
import { Subject } from '@/subjects/entities/subject.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Task, Subject])],
  exports: [TypeOrmModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
