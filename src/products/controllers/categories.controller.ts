import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';

import { CategoriesService } from './../services/categories.service';

@Controller('categories')
export class CategoriesController {

  constructor(
    private categoriesService: CategoriesService
  ) {}

  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.categoriesService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.categoriesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }

  // @Post()
  // @HttpCode(HttpStatus.GONE)
  // create(@Body() body: any) {
  //   return body;
  // }

  // @Get()
  // findAll(@Res() response) { 
  //   response.status(200).send('This action returns all categories');
  // }
}
