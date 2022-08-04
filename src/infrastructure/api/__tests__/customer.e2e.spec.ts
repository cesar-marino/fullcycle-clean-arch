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
});