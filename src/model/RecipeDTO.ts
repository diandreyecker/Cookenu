
export interface RecipeInputDTO {
    title: string,
    description: string,
    token: string
}

export interface Recipe {
    id: string,
    title: string,
    description: string,
    date: Date,
    user_id: string
}