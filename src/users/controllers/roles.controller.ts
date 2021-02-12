import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';

import { RolesService } from '../services/roles.service';

@Controller('roles')
export class RolesController {

  constructor(
    private rolesService: RolesService
  ) {}

  @Get()
  getAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.rolesService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.rolesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
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
