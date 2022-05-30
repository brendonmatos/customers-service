import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Customer, CustomersRepositoryInterface, InjectCustomerRepository } from './customers-repository';

@Injectable()
export class AppService {
  constructor(
    @InjectCustomerRepository customerRepository: CustomersRepositoryInterface,
  ) {
    
  }
  getHello(): string {
    return 'Hello World!';
  }
  
}
