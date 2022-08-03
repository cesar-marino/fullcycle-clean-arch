import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.usecase";

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    };
};

describe("Unit test a create product use case", () => {
    it("Should create a product", async () => {
        const product = ProductFactory.create("Product 1", 10);
        const productRepository = mockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const input = { name: product.name, price: product.price };
        const output = await usecase.execute(input);

        expect(output).toEqual({ id: expect.any(String), name: product.name, price: product.price });
    });
});