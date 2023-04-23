import { BaseError } from "../error/BaseError";
import { Recipe } from "../model/RecipeDTO";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {

    RECIPE_TABLE = "Cookenu_recipe"

    public insertRecipe = async (recipe: Recipe) => {
        try {
            await RecipeDatabase.connection(this.RECIPE_TABLE).insert(recipe)
        } catch (error: any) {
            throw new BaseError(400, error.message)
        }
    }
}
