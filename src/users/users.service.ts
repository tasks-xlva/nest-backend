import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(
    email: User['email'],
    pass: User['password'],
  ): Promise<any> {
    const user = await this.usersRepository.findOne(email)
    if (user && user.password === pass) {
      delete user.password
      return user
    }
    return null
  }

  async create({ password, rePassword, ...createUserDto }: CreateUserDto) {
    if (password !== rePassword) {
      throw new BadRequestException(`Passwords doesn't match`)
    }

    return this.usersRepository.findOne(
      await this.usersRepository.save({
        ...createUserDto,
        password: await hash(password, 10),
      }),
    )
  }

  // findAll() {
  //   return this.usersRepository.find()
  // }

  async findOne(email: User['email']) {
    return await this.usersRepository.findOne(email)
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   return this.usersRepository.findOne(
  //     await this.usersRepository.save({ id, ...updateUserDto }),
  //   )
  // }
  //
  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id)
  // }
}
