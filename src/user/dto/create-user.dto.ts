/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {
     

    @IsNotEmpty()
    @MaxLength(10)
    @IsString()
    readonly username: string;
    
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    @IsString()
    readonly password: string;    

    
}
