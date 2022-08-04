import express, { Request, Response } from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import FindCustomerUseCase from '../../../usecase/customer/find/find.customer.usecase';
import ListCustomerUsecase from '../../../usecase/customer/list/list.customer.usecases';
import UpdateCustomerUsecase from '../../../usecase/customer/update/update.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());

    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city,
            },
        };

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

customerRoute.put("/", async (req: Request, res: Response) => {
    const usecase = new UpdateCustomerUsecase(new CustomerRepository());

    try {
        const input = {
            id: req.body.id,
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city,
            },
        };

        const output = await usecase.execute(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

customerRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListCustomerUsecase(new CustomerRepository());

    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

customerRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = new FindCustomerUseCase(new CustomerRepository());

    try {
        const output = await usecase.execute({ id: req.params.id });
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});