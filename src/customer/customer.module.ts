import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { ProvideCustomerRepository } from './customers-repository';
import { CustomersRepositoryMock } from '../infra/customers-repository.mock';
import { ProvideAuthService } from './auth-service';
import { AuthServiceKeycloak } from '../infra/auth-service.keycloak';
// import { AuthServiceMock } from '../infra/auth-service.mock';
// import { CustomersRepositoryRedis } from 'src/customers-repository.redis';
// import Redis from 'ioredis';
// const redis = new Redis()

@Module({
  controllers: [CustomerController],
  providers: [
    CustomerService, 
    ProvideCustomerRepository(CustomersRepositoryMock),
    ProvideAuthService(AuthServiceKeycloak)
  ]
})
export class CustomerModule {
}
