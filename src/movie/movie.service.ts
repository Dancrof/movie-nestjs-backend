/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie} from './entities/movie.entity';

@Injectable()
export class MovieService {
  
  constructor(@InjectRepository(Movie) private readonly movieRepository: Repository<Movie>){}

   async create(createMovieDto: CreateMovieDto){
     const esxisMovie = await this.movieRepository.findOne({
       name: createMovieDto.name,
       movieUrl: createMovieDto.movieUrl
     })
     if(esxisMovie) throw new BadRequestException('This movie already exists');
   const newMovie = this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(newMovie);
  }

  async findAll(): Promise<Movie[]> {
    const movies = await this.movieRepository.find();
    if(!movies) throw new NotFoundException('Empty movie list');
    return movies;
  }

  async findAllFilter(filter: string): Promise<Movie[]> {
    const moviesFilter = await this.movieRepository.find({where:{name: filter}});
    return moviesFilter;
  }

  async findOne(id: number): Promise<Movie>{
    const movie = await this.movieRepository.findOne(id)
    if(!movie) throw new NotFoundException('movie not exist');
    return movie
  }

  async update(id: number, updateMovieDto: UpdateMovieDto, ) {
    const searchMovie =  await this.findOne(id);
    
    const update =  Object.assign(searchMovie, updateMovieDto);
    return await this.movieRepository.save(update);
  }

  async remove(id: number) {
    const searchAndDelete = await this.findOne(id);
    return this.movieRepository.remove(searchAndDelete);
  }
  
}
