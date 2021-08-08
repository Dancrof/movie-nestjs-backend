/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jtwService: JwtService
    ){}
  
   async validateUser(email: string, password: string): Promise<any> {
   const user = await this.userService.searchUser({email});

   if(user && await compare(password, user.password)){
    const  {password, ...rest} = user; 
    return rest;
   }
   return null;
  }

  login(user: User) {
    const {id, ...rest} = user;
    const payload = { sub: id};

    return {
      accessToken: this.jtwService.sign(payload)
    };
  }
}
