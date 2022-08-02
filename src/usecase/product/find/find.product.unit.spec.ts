import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("Product 1", 100.00);

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(product),
        findAll: jest.fn(),
    };
};

describe("Unit test find product", () => {
    it("Should find product", async () => {
        const productRepository = mockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = { id: product.id };
        const output = await usecase.execute(input);

        expect(output).toEqual({ id: product.id, name: product.name, price: product.price });
    });
});