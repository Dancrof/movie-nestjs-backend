/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
             
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    readonly email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    readonly password: string;
}
