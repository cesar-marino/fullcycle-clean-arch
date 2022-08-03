import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("Product 1", 100.00);
const product2 = ProductFactory.create("Product 2", 50);

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue([product1, product2]),
    };
};

describe("Unit test list all products use case", () => {
    it("Should list all products", async () => {
        const productRepository = mockRepository();
        const usecase = new ListProductUseCase(productRepository);

        const output = await usecase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });
});