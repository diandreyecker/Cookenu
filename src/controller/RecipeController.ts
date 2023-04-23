import { Request, Response } from 'express'
import { RecipeInputDTO } from '../model/RecipeDTO'
import { RecipeBusiness } from '../business/RecipeBusiness'

export class RecipeController {

    public createRecipe = async (req: Request, res: Response) => {
        try {
            const input: RecipeInputDTO = {
                title: req.body.title,
                description: req.body.description,
                token: req.headers.authorization as string
            }
            
            const recipeBusiness = new RecipeBusiness()
            await recipeBusiness.createRecipe(input)

            res.status(201).send({ message: "Receita criada com sucesso"! })

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }
}
