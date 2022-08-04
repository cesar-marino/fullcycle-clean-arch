import Notification from "./notification";

describe("Unit test for notifications", () => {
    it("Should create errors", () => {
        const notification = new Notification();
        const errors = {
            message: "error message",
            context: "customer"
        };

        notification.addError(errors);

        expect(notification.messages("customer")).toBe("customer: error message,");

        const errors2 = {
            message: "error message2",
            context: "customer"
        };

        notification.addError(errors2);

        expect(notification.messages("customer")).toBe("customer: error message,customer: error message2,");

        const errors3 = {
            message: "error message3",
            context: "order"
        };

        notification.addError(errors3);

        expect(notification.messages("customer")).toBe("customer: error message,customer: error message2,");

        expect(notification.messages()).toBe(
            "customer: error message,customer: error message2,order: error message3,"
        );
    });

    it("Should check if notification has at lest one error", () => {
        const notification = new Notification();
        notification.addError({ message: "error message", context: "customer" });

        expect(notification.hasErrors()).toBe(true);
    });

    it("Should get all errors props", () => {
        const notification = new Notification();
        const error = { message: "error message", context: "customer" };
        notification.addError(error);

        expect(notification.getErrors()).toEqual([error]);
    });
});