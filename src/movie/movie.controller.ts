/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res, HttpStatus } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth-decorator';

@ApiTags('Movie Controller')
@Controller('movie')
export class MovieController {
  
  constructor(private readonly movieService: MovieService) {}

  
  @Post('create')
  async create(@Res() res, @Body() createMovieDto: CreateMovieDto ) {
    const newMovie = await this.movieService.create(createMovieDto, );
    return res.status(HttpStatus.OK).json({
      message: 'movie Create',
      newMovie
    });
  }

  @Get('list')
  async findAll(@Res() res) {
    const movies = await this.movieService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'movies',
      movies
    });
  }

  @Get('list/:name')
  async findAllFilter(@Res() res, @Param('name') name: string) {
    const moviesFilter = await this.movieService.findAllFilter(name);
    return res.status(HttpStatus.OK).json({
      message: 'search movie',
      moviesFilter
    });
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const movie = await this.movieService.findOne(id);
    return res.status(HttpStatus.OK).json({
      message: 'movie',
      movie
    });
  }

  @Patch('update/:id')
  async update(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() updateMovieDto: UpdateMovieDto) {
    const dataUpdate = await this.movieService.update(id, updateMovieDto);
    return res.status(HttpStatus.OK).json({
      message: 'movie update',
      dataUpdate
    });
  }

  
  @Delete('delete/:id')
  async remove(@Res() res, @Param('id', ParseIntPipe) id: number ) {
    const dataDelete = await this.movieService.remove(id);
    return res.status(HttpStatus.OK).json({
      message: 'movie delete',
      dataDelete
    });
  }
     
}
