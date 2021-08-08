/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Controller')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService ) {}
  
   
  @Post('/create')
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'User Created',
      newUser
    });
  }

  @Get()
  async findAll(@Res() res,) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'Users',
      users
    });
  }

  @Get(':id')
  async findOne(@Res() res,@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findId(id);
   return res.status(HttpStatus.OK).json(user);
  }

  
  @Patch('update/:id')
  async update(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
  
    const  dataUpdate =  await this.userService.update(id, updateUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'User update',
      dataUpdate
    });
  }

  
  @Delete('delete/:id')
  async remove(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const  dataDelete =  await this.userService.delete(id);
    return res.status(HttpStatus.OK).json({
      message: 'User delete',
      dataDelete
    });
  }
}
