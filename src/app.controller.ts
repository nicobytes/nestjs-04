import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo-endpoint')
  getNewEndpoint(): string {
    return 'Soy un nuevo endpoint';
  }

  @Get('products')
  getProducts(): number[] {
    return [1,2,3];
  }

  @Get('categories')
  getCategories(): number[] {
    return [4,5,6];
  }
}