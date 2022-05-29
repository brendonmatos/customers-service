import { Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/customers')
  createCustomer() {
    return {
      id: randomUUID(),
      name: 'John Doe',
      document: '12345678910',
    }
  }

  @Get('/customers/:id')
  getCustomer(id: string) {
    return {
      id: id,
      name: 'John Doe',
      document: '12345678910',
    }
  }
  
}
