import { Request, Response } from "express";
import { UserInputDTO } from "../model/UserDTO";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {

    public signup = async (req: Request, res: Response) => {
        try {
            const input: UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const userBusiness = new UserBusiness();
            const token = await userBusiness.signup(input)

            res.status(201).send({ message: "Usuário criado com sucesso!", token })

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }
}