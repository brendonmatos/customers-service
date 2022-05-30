import { Injectable } from '@nestjs/common';
import { CustomersRepositoryInterface, InjectCustomerRepository } from './customers-repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {

  constructor(
    @InjectCustomerRepository public customerRepository: CustomersRepositoryInterface
  ) {}

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: string): Promise<Customer> {
    return this.customerRepository.getCustomer(id);
  }

  save(customer: Customer): Promise<Customer> {
    if( customer.id ) {
      return this.customerRepository.updateCustomer(customer.id, customer);
    }

    return this.customerRepository.createCustomer(customer)
  }

  remove(id: string) {
    return this.customerRepository.deleteCustomer(id);
  }
}
