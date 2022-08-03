import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "César Marino");
const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
customer.changeAddress(address);

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test find customer use case", () => {
    it("Should find a customer", async () => {
        const customerRepository = mockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

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

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("Should not find a customer", async () => {
        const customerRepository = mockRepository();
        customerRepository.find.mockImplementation(() => {
            throw Error("Customer not found");
        });
        const usecase = new FindCustomerUseCase(customerRepository);
        const input = { id: "123" }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found");
    });
});