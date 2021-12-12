import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { UpdateSubjectDto } from './dto/update-subject.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Subject } from './entities/subject.entity'
import { Repository } from 'typeorm'
import { Group } from '@/groups/entities/group.entity'

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,

    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const group = await this.groupsRepository.findOne(createSubjectDto.group)

    if (!group) {
      throw new NotFoundException('Provided group not found')
    }

    return this.subjectsRepository.findOne(
      await this.subjectsRepository.save({
        ...createSubjectDto,
        group,
      }),
    )
  }

  async findAll(groupNumber: string): Promise<Subject[]> {
    const group = await this.groupsRepository.findOne({ number: groupNumber })

    if (groupNumber && !group) {
      throw new NotFoundException('Provided group not found')
    }

    return group
      ? this.subjectsRepository.find({ group })
      : this.subjectsRepository.find()
  }

  findOne(id: number): Promise<Subject> {
    return this.subjectsRepository.findOne(id)
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsRepository.findOne(
      await this.subjectsRepository.save({ id, ...updateSubjectDto }),
    )
  }

  async remove(id: number): Promise<void> {
    await this.subjectsRepository.delete(id)
  }
}
