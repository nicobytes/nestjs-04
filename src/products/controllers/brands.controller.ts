import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';

import { BrandsService } from '../services/brands.service';

@Controller('brands')
export class BrandsController {

  constructor(
    private brandsService: BrandsService
  ) {}

  @Get()
  getAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.brandsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.brandsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
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
