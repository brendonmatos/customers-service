
import { Redis } from 'ioredis'
import { randomUUID } from "crypto";
import { CustomersRepositoryInterface } from './customer/customers-repository';
import { Customer } from './customer/entities/customer.entity';

export class CustomersRepositoryMock implements CustomersRepositoryInterface {

  store: { [key: string]: Customer } = {}

  constructor() { 
  }

  async createCustomer(customer: Omit<Customer, "id">): Promise<Customer> {
    const id = randomUUID();
    const newCustomer = {
      ...customer,
      id,
    }
    this.store[id] = newCustomer;
    return newCustomer
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    const customer = this.store[id];

    if (!customer) {
      return undefined;
    }

    return customer
  }

  async updateCustomer(id: string, customer: Customer): Promise<Customer> {
    const foundCustomer = this.store[id]

    if (!foundCustomer) {
      throw new Error(`Customer with id ${id} not found`);
    }

    this.store[id] = customer;
    return customer
  }

  async deleteCustomer(id: string): Promise<boolean> {
    const foundCustomer = this.store[id]

    if (!foundCustomer) {
      throw new Error(`Customer with id ${id} not found`);
    }

    delete this.store[id];
    return true
  }

}