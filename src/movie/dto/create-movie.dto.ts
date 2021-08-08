/* eslint-disable prettier/prettier */
import {IsArray,  IsNotEmpty,  IsString, MaxLength } from "class-validator";

export class CreateMovieDto {

    @IsNotEmpty()
    @IsString()
    coverUrl: string;
    

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;
    
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    sinopsis: string;
    
    @IsNotEmpty()
    @IsArray()
    category: string[];
    
    @IsString()
    movieUrl: string;

}
