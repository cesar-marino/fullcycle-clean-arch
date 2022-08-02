import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUsecase from "./list.customer.usecases";

const customer1 = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 123, "Zip 1", "City 1"));
const customer2 = CustomerFactory.createWithAddress("Customer 2", new Address("Street 2", 321, "Zip 2", "City 1"));

const mockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    }
};

describe("Unit test for listing customer use case", () => {
    it("Should list a customer", async () => {
        const customerRepository = mockRepository();
        const usecase = new ListCustomerUsecase(customerRepository);

        const output = await usecase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    });
});