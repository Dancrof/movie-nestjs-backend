/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user-decorator';
import { User as UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth-decorator';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Res() res, @User() user: UserEntity, @Body() login: CreateAuthDto) {
    const data = await this.authService.login(user);
    return res.status(HttpStatus.OK).json({
      message :'Login Success',
      data
    });
  }
 
  @Auth()
  @Get('/profile')
  profile(@Res() res, @User() user: UserEntity) {
    return res.status(HttpStatus.OK).json({
      message: 'Profile',
      user
    });
  }
  
  @Auth()
  @Get('/refresh')
   refreshToken(@Res() res,@User() user: UserEntity) {
   const data =  this.authService.login(user);
   return res.status(HttpStatus.OK).json({
    message: 'Refresh Success',
    data
   });
  }
}
