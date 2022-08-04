import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => await sequelize.sync({ force: true }));
    afterAll(async () => await sequelize.close());

    it("Should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({ name: "Product 1", price: 50 });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(50);
    });

    it("Should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({ name: "Product 1", price: -10 });

        expect(response.status).toBe(500);
    });

    it("Should list all products", async () => {
        const response = await request(app)
            .post("/product")
            .send({ name: "Product 1", price: 10 });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(10);

        const response2 = await request(app)
            .post("/product")
            .send({ name: "Product 2", price: 10.50 });

        expect(response2.status).toBe(200);
        expect(response2.body.name).toBe("Product 2");
        expect(response2.body.price).toBe(10.50);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const product1 = listResponse.body.products[0];
        expect(product1.name).toBe("Product 1");
        expect(product1.price).toBe(10);

        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Product 2");
        expect(product2.price).toBe(10.50);
    });

    it("Should update a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({ name: "Product 1", price: 50 });

        expect(response.status).toBe(200);

        const updateResponse = await request(app).put("/product").send({ id: response.body.id, name: "Product 2", price: 50.50 });
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.name).toBe("Product 2");
        expect(updateResponse.body.price).toBe(50.50);
    });

    it("Should get a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({ name: "Product 1", price: 50 });

        expect(response.status).toBe(200);

        const getResponse = await request(app).get(`/product/${response.body.id}`).send();

        expect(getResponse.status).toBe(200);
        expect(getResponse.body.id).toBe(response.body.id);
        expect(getResponse.body.name).toBe("Product 1");
        expect(getResponse.body.price).toBe(50);
    });
});