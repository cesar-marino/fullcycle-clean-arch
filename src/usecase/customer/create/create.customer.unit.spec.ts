import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "César",
    address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City",
    },
};

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit test create customer use case", () => {
    it("Should create a customer", async () => {
        const customerRepository = mockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: input.address,
        });
    });

    it("Should throw an error when name is missing", async () => {
        const customerRepository = mockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    });

    it("Should throw an error when street is missing", async () => {
        const customerRepository = mockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(usecase.execute(input)).rejects.toThrow("Street is required");
    });
});