import { Request, Response } from "express";
import { LoginUserInputDTO, UserInputDTO } from "../model/UserDTO";
import { UserBusiness } from "../business/UserBusiness"

export class UserController {

    userBusiness = new UserBusiness();

    public signup = async (req: Request, res: Response) => {
        try {
            const input: UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const token = await this.userBusiness.signup(input)

            res.status(201).send({ message: "Usuário criado com sucesso!", token })

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const input: LoginUserInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await this.userBusiness.login(input)
            res.status(200).send({ message: "Usuário logado", token })

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }

    public myProfile = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string

            const result = await this.userBusiness.myProfile(token)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }
}