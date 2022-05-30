import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { ProvideCustomerRepository } from 'src/customer/customers-repository';
import { CustomersRepositoryRedis } from 'src/customers-repository.redis';
import Redis from 'ioredis';

const redis = new Redis()

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, ProvideCustomerRepository(new CustomersRepositoryRedis(redis))]
})
export class CustomerModule {}
