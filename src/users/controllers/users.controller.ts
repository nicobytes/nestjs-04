import { Controller, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';

import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) {}

  @Get()
  getAll(){
    return this.usersService.findAll();
  }

  @Get('filter')
  findAll(@Query() paginationQuery: any) {
    const { limit, offset } = paginationQuery;
    return `This action returns all products. Limit ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
