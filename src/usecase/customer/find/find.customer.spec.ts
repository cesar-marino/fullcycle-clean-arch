import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer usecase", () => {
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

    it("Should find a customer", async () => {
        const customer = new Customer("123", "César Marino");
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const input = { id: "123" }
        const output = {
            id: "123",
            name: "César Marino",
            address: {
                street: "Street 1",
                number: 123,
                city: "City 1",
                zip: "Zipcode 1"
            }
        }

        const usecase = new FindCustomerUseCase(customerRepository);
        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});