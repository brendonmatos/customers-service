import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { ProvideCustomerRepository } from './customers-repository';
import { CustomersRepositoryMock } from '../customers-repository.mock';
// import { CustomersRepositoryRedis } from 'src/customers-repository.redis';
// import Redis from 'ioredis';
// const redis = new Redis()

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, ProvideCustomerRepository(new CustomersRepositoryMock())]
})
export class CustomerModule {}
