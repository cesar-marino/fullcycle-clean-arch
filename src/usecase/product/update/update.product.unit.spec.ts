import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUsecase from "./update.product.usecase";

const product = ProductFactory.create("Product 1", 100.00);

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(product),
        findAll: jest.fn(),
    };
};

describe("Unit test update a product", () => {
    it("Should update a product", async () => {
        const productRepository = mockRepository();
        const usecase = new UpdateProductUsecase(productRepository);

        const input = { id: product.id, name: "Product 2", price: 50 };
        const output = await usecase.execute(input);

        expect(output).toEqual({ id: product.id, name: "Product 2", price: 50 });
    });
});