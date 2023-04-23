import { BaseError } from "../error/BaseError";
import { InvalidToken, MissingDescription, MissingTitle } from "../error/RecipeError";
import { MissingToken } from "../error/UserError";
import { Recipe, RecipeInputDTO } from "../model/RecipeDTO";
import { IdGenerator } from './../services/IdGenerator';
import { RecipeDatabase } from './../data/RecipeDatabase';
import { TokenGenerator } from "../services/TokenGenerator";

export class RecipeBusiness {

    public createRecipe = async (input: RecipeInputDTO) => {
        try {
            if (!input.title) {
                throw new MissingTitle()
            }
            if (!input.description) {
                throw new MissingDescription()
            }
            if (!input.token) {
                throw new MissingToken()
            }

            const tokenGenerator = new TokenGenerator().tokenData(input.token)

            if (!tokenGenerator.id) {
                throw new InvalidToken()
            }

            const id = new IdGenerator().generateId()
            const date = new Date() as any //GERAR DATA ATUAL

            const recipe: Recipe = {
                id,
                title: input.title,
                description: input.description,
                date,
                user_id: tokenGenerator.id
            }

            const recipeDatabase = new RecipeDatabase()
            await recipeDatabase.insertRecipe(recipe)

        } catch (error: any) {
            throw new BaseError(400, error.message)
        }
    }
}