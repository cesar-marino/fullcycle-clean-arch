import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import UpdateCustomerUsecase from "./update.customer.usecase";

describe("Test updated customer", () => {
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

    it("Should updated a customer", async () => {
        const customer = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 123, "Zipcode 1", "City 1"));
        const customerRepository = new CustomerRepository();
        customerRepository.create(customer);

        const updateCustomerUseCase = new UpdateCustomerUsecase(customerRepository);

        const input = {
            id: customer.id,
            name: "Customer updated",
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: "Zipcode 2",
                city: customer.address.city,
            },
        };

        const output = await updateCustomerUseCase.execute(input);

        expect(output).toEqual({
            id: customer.id,
            name: "Customer updated",
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: "Zipcode 2",
                city: customer.address.city,
            },
        });
    });
});