import { UserDatabase } from "../data/UserDatabase";
import { BaseError } from "../error/BaseError";
import * as err from "../error/UserError";
import { LoginUserInputDTO, User, UserInputDTO, UserProfile } from "../model/UserDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { validatePassword } from "../services/validatePassword";
import { HashManager } from './../services/HashManager';
import { validateEmail } from './../services/validateEmail';


export class UserBusiness {

    userDatabase = new UserDatabase()
    hashMananger = new HashManager()

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

    public login = async (input: LoginUserInputDTO) => {

        try {
            if (!input.email) {
                throw new err.MissingEmail()
            }
            if (!input.password) {
                throw new err.MissingPassword()
            }

            const isEmailValid = validateEmail(input.email)
            if (!isEmailValid) {
                throw new err.InvalidEmail()
            }

            const user = await this.userDatabase.findUser(input.email)
            if (!user) {
                throw new err.WrongEmail()
            }

            const comparePassword: boolean = await this.hashMananger.compareHash(input.password, user.password)
            if (!comparePassword) {
                throw new err.WrongPassword()
            }

            const tokenGenerate = new TokenGenerator()
            const token = await tokenGenerate.generateToken(user.id)
            return token

        } catch (error: any) {
            throw new BaseError(400, error.message)
        }
    }

    public myProfile = async (input: string) => {

        try {
            const token = input

            if (!token) {
                throw new err.MissingToken()
            }
            const tokenGenerator = new TokenGenerator()
            const data = tokenGenerator.tokenData(token)

            const result = await this.userDatabase.myProfile(data.id)
            return result

        } catch (error: any) {
            throw new BaseError(400, error.message)
        }
    }
}