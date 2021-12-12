import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.findOne(
      await this.usersRepository.save(createUserDto),
    )
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOne(
      await this.usersRepository.save({ id, ...updateUserDto }),
    )
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
