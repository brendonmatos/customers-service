import { Customer, CustomersRepositoryInterface } from "./customers-repository";
import { Redis } from 'ioredis'
import { randomUUID } from "crypto";

export class CustomersRepositoryRedis implements CustomersRepositoryInterface {

    constructor(public redis: Redis) { }

    async createCustomer(customer: Omit<Customer, "id">): Promise<Customer> {
        const id = randomUUID();
        const newCustomer = {
          ...customer,
          id,
        }
        await this.redis.set(`customer:${id}`, JSON.stringify(newCustomer));
        return {
          id,
          name: customer.name,
          document: customer.document,
        }
      }
    
      async getCustomer(id: string): Promise<Customer | undefined> {
        const customer = await this.redis.get(`customer:${id}`);
    
        if (!customer) {
          return undefined;
        }
    
        return JSON.parse(customer);
      }
    
      async updateCustomer(id: string, customer: Customer): Promise<Customer> {
        const foundCustomer = await this.redis.get(`customer:${id}`);
    
        if (!foundCustomer) {
          throw new Error(`Customer with id ${id} not found`);
        }
    
        await this.redis.set(`customer:${id}`, JSON.stringify(customer));
    
        return customer
      }
    
      async deleteCustomer(id: string): Promise<void> {
        const foundCustomer = await this.redis.get(`customer:${id}`);
    
        if (!foundCustomer) {
          throw new Error(`Customer with id ${id} not found`);
        }
    
        await this.redis.del(`customer:${id}`);
      }

}