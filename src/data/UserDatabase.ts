import { BaseError } from "../error/BaseError";
import { User } from "../model/UserDTO";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    private USER_TABLE = "Cookenu_users"

    insertUser = async (user: User): Promise<void> => {
        try {
            await UserDatabase.connection(this.USER_TABLE).insert(user)

        } catch (error: any) {
            throw new BaseError(400, error.message);
        }
    }

}