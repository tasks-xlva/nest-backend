import { Injectable } from '@nestjs/common'
import { CreateGroupDto } from './dto/create-group.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Group } from './entities/group.entity'

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    return this.groupsRepository.findOne(
      await this.groupsRepository.save(createGroupDto),
    )
  }

  findAll() {
    return this.groupsRepository.find()
  }

  findOne(number: string) {
    return this.groupsRepository.findOne(number)
  }
}
