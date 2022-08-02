import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUsecase from "./update.customer.usecase";

const address = new Address("Street", 123, "Zip", "City");
const customer = CustomerFactory.createWithAddress("César", address);
const input = {
    id: customer.id,
    name: "Updated",
    address: {
        street: address.street,
        number: 1234,
        zip: address.zip,
        city: address.city,
    }
};

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit test for customer update use case", () => {
    it("Should update a customer", async () => {
        const customerRepository = mockRepository();
        const usecase = new UpdateCustomerUsecase(customerRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });
});