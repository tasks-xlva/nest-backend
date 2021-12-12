import { Module } from '@nestjs/common'
import { SubjectsService } from './subjects.service'
import { SubjectsController } from './subjects.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Subject } from './entities/subject.entity'
import { Group } from '@/groups/entities/group.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Group])],
  exports: [TypeOrmModule],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
