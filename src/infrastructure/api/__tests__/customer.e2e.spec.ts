import { app, sequelize } from '../express';
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => await sequelize.sync({ force: true }));
    afterAll(async () => await sequelize.close());

    it("Should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "César Marino",
                address: {
                    street: "Street 1",
                    number: 123,
                    zip: "Zip 1",
                    city: "City 1",
                },
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("César Marino");
        expect(response.body.address.street).toBe("Street 1");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("Zip 1");
        expect(response.body.address.city).toBe("City 1");
    });

    it("Should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({ name: "César Marino" });

        expect(response.status).toBe(500);
    });

    it("Should list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "César Marino",
                address: {
                    street: "Street 1",
                    number: 123,
                    zip: "Zip 1",
                    city: "City 1",
                },
            });

        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Customer",
                address: {
                    street: "Street 2",
                    number: 321,
                    zip: "Zip 2",
                    city: "City 2",
                },
            });

        expect(response.status).toBe(200);

        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);

        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe("César Marino");
        expect(customer.address.street).toBe("Street 1");

        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Customer");
        expect(customer2.address.street).toBe("Street 2");
    });
});