import { Inject } from "@nestjs/common";
import { Customer } from "./entities/customer.entity";


export const ProvideCustomerRepository = (repository: CustomersRepositoryInterface | any) => {

    if (typeof repository === 'function') {
        return {
            provide: "CustomersRepository",
            useClass: repository,
        };
    }

    return {
        provide: "CustomersRepository",
        useValue: repository,
    }
}

export const InjectCustomerRepository = Inject("CustomersRepository")

export interface CustomersRepositoryInterface {
    deleteCustomer(id: string): Promise<boolean>;
    getCustomer(id: string): Promise<Customer>;
    createCustomer(customer: Omit<Customer, "id">): Promise<Customer>;
    updateCustomer(id: string, customer: Customer): Promise<Customer>;
}