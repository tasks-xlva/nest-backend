import { Module } from '@nestjs/common'
import { SubjectsService } from './subjects.service'
import { SubjectsController } from './subjects.controller'
import { Subject } from './entities/subject.entity'
import { Group } from '@/groups/entities/group.entity'
import { SequelizeModule } from '@nestjs/sequelize'
import { Task } from '@/tasks/entities/task.entity'

@Module({
  imports: [SequelizeModule.forFeature([Subject, Group, Task])],
  exports: [SequelizeModule],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
