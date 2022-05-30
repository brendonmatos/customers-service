import { Inject } from "@nestjs/common";

export type Customer = {
    id: string;
    name: string;
    document: string;
}

export const ProvideCustomerRepository = (repository: CustomersRepositoryInterface) => {
    return {
        provide: "CustomersRepository",
        useValue: repository,
    }
}

export const InjectCustomerRepository = Inject("CustomersRepository")

export interface CustomersRepositoryInterface {
    getCustomer(id: string): Promise<Customer>;
    createCustomer(customer: Omit<Customer, "id">): Promise<Customer>;
    updateCustomer(id: string, customer: Customer): Promise<Customer>;
}