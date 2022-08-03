import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";

describe("Test create customer", () => {
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

    it("Should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 123,
                zip: "Zipcode 1",
                city: "City 1",
            },
        }

        const output = await createCustomerUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 123,
                zip: "Zipcode 1",
                city: "City 1",
            }
        });
    });
});