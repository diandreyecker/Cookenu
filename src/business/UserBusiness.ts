import { UserDatabase } from "../data/UserDatabase";
import { BaseError } from "../error/BaseError";
import * as err from "../error/UserError";
import { User, UserInputDTO } from "../model/UserDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { validateEmail } from "../services/validateEmail";
import { validatePassword } from "../services/validatePassword";
import { HashManager } from './../services/HashManager';


export class UserBusiness {
    public signup = async (input: UserInputDTO) => {

        try {
            if (!input.name) {
                throw new err.MissingName();
            }
            if (!input.email) {
                throw new err.MissingEmail();
            }
            if (!input.password) {
                throw new err.MissingPassword;
            }

            const isEmailValid = validateEmail(input.email)
            if (!isEmailValid) {
                throw new err.InvalidEmail();
            }

            const isPasswordValid = validatePassword(input.password)
            if (!isPasswordValid) {
                throw new err.InvalidPassword();
            }

            const idGenerator = new IdGenerator();
            const id: string = idGenerator.generateId()

            const hashManager = new HashManager()
            const hashPassword: string = await hashManager.generateHash(input.password)

            const user: User = {
                id,
                name: input.name,
                email: input.email,
                password: hashPassword,
            }

            const userDatabase = new UserDatabase()
            await userDatabase.insertUser(user)

            const tokenGenerator = new TokenGenerator()
            const token = tokenGenerator.generateToken(id)
            return token

        } catch (error: any) {
            throw new BaseError(400, error.message);
        }
    }
}