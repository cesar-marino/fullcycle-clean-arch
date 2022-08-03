import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUsecase from "./update.product.usecase";

describe("Test updated product use case", () => {
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

    it("Should updated a customer", async () => {
        const product = ProductFactory.create("Product 1", 10);
        const productRepository = new ProductRepository();
        productRepository.create(product);

        const updateProductUseCase = new UpdateProductUsecase(productRepository);

        const input = {
            id: product.id,
            name: "Product updated",
            price: 10.5,
        };

        const output = await updateProductUseCase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: "Product updated",
            price: 10.5,
        });
    });
});