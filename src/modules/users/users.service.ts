import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { hash } from 'bcrypt'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async validateUser(
    email: User[`email`],
    pass: User[`password`],
  ): Promise<any> {
    const user = await this.userModel.findOne({ where: { email } })
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

    return await this.userModel.create({
      ...createUserDto,
      password: await hash(password, 10),
    })
  }

  // findAll() {
  //   return this.usersRepository.find()
  // }

  async findOnePopulated(email: User[`email`]) {
    return await this.userModel.findOne({
      where: { email },
      attributes: { exclude: [`password`] },
    })
  }

  async findOne(email: User[`email`]) {
    return await this.userModel.findOne({ where: { email } })
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
