import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list all products use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => await sequelize.close());

    it("Should list all products", async () => {
        const product1 = ProductFactory.create("Product 1", 50);
        const product2 = ProductFactory.create("Product 2", 10.50);

        const productRepository = new ProductRepository();
        productRepository.create(product1);
        productRepository.create(product2);

        const listProductUseCase = new ListProductUseCase(productRepository);

        const output = await listProductUseCase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].name).toEqual("Product 1");
        expect(output.products[0].price).toEqual(50);
        expect(output.products[1].name).toEqual("Product 2");
        expect(output.products[1].price).toEqual(10.50);
    });
});