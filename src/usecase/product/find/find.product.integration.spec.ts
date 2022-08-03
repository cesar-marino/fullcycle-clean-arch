import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product usecase", () => {
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

    it("Should find a product", async () => {
        const product = ProductFactory.create("Product 1", 100);
        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const input = { id: product.id }
        const output = { id: product.id, name: "Product 1", price: 100 };

        const usecase = new FindProductUseCase(productRepository);
        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});