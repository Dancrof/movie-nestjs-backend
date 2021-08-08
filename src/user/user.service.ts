/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const userExis = await this.userRepository.findOne({
      username: createUserDto.username, 
      email: createUserDto.email
    });
    if(userExis) throw new BadRequestException('User already exists');
    const newUser = this.userRepository.create(createUserDto);
    const hidePassword = await this.userRepository.save(newUser);
    
    delete hidePassword.password;
    return hidePassword;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    if(!users.length) throw new NotFoundException('lista de usuarios vacia');
    return users;
  }

  async findId(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id)
    if(!user) throw new NotFoundException('User not exist');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, ): Promise<User>{
    const findUser = await this.findId(id);
    const updateUser = Object.assign(findUser, updateUserDto);
    return this.userRepository.save(updateUser);
  }

  async delete(id: number ): Promise<User>{
    const deleteUser = await this.findId(id);
   return await this.userRepository.remove(deleteUser);
  }

  async searchUser(data: IUser){
    return await this.userRepository
    .createQueryBuilder('user')
    .where(data)
    .addSelect('user.password')
    .getOne()
  };
}
