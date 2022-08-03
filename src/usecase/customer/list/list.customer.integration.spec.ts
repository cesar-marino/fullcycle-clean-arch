import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ListCustomerUsecase from "./list.customer.usecases";

describe("Test list all customers", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should list all customers", async () => {
        const address1 = new Address("Street 1", 123, "Zipcode 1", "City 1");
        const address2 = new Address("Street 2", 321, "Zipcode 2", "City 2");
        const customer1 = CustomerFactory.createWithAddress("Customer 1", address1);
        const customer2 = CustomerFactory.createWithAddress("Customer 2", address2);

        const customerRepository = new CustomerRepository();
        customerRepository.create(customer1);
        customerRepository.create(customer2);

        const listCustomerUseCase = new ListCustomerUsecase(customerRepository);

        const output = await listCustomerUseCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].name).toEqual("Customer 1");
        expect(output.customers[0].address.street).toEqual("Street 1");
        expect(output.customers[1].name).toEqual("Customer 2");
        expect(output.customers[1].address.street).toEqual("Street 2");
    });
});