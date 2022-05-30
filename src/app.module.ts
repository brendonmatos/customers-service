
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Redis from 'ioredis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvideCustomerRepository } from './customers-repository';
import { CustomersRepositoryRedis } from './customers-repository.redis';


const redis = new Redis()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true
    })
  ],
  controllers: [AppController],
  providers: [AppService,
    ProvideCustomerRepository(new CustomersRepositoryRedis(redis))],
})
export class AppModule { }
