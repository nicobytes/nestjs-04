import { Controller, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';

import { ProductsService } from './../services/products.service';

@Controller('products')
export class ProductsController {

  constructor(
    private productsService: ProductsService
  ) {}

  @Get()
  getAll(){
    return this.productsService.findAll();
  }

  @Get('filter')
  findAll(@Query() paginationQuery: any) {
    const { limit, offset } = paginationQuery;
    return `This action returns all products. Limit ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.productsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
