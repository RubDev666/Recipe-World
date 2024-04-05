import { z } from "zod";

const ApiCategoriesSchema = z.object({
    idCategory: z.string(),
    strCategory: z.string(),
    strCategoryDescription: z.string(),
    strCategoryThumb: z.string()
});

const ApiMealSchema = z.object({
    idMeal: z.string(),
    strMeal: z.string(),
    strMealThumb: z.string()
});

const ApiDrinkSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string()
});

const FavoriteTypeSchema = z.object({
    id: z.string(),
    titulo: z.string(),
    imgUrl: z.string(),
    tipo: z.string(),
});

interface RecipeModel {
    strInstructions: z.ZodString;
    [prop: string]: z.ZodString | z.ZodNullable<z.ZodString>;
}

const RecipeSchema = z.object<RecipeModel>({
    strInstructions: z.string()
});

export type ApiCategories = z.infer<typeof ApiCategoriesSchema>
export type ApiMeal = z.infer<typeof ApiMealSchema>
export type ApiDrink = z.infer<typeof ApiDrinkSchema>
export type FavoriteType = z.infer<typeof FavoriteTypeSchema>
export type RecipeType = z.infer<typeof RecipeSchema>

export type ApiType = ApiMeal & ApiDrink & FavoriteType;

export type ShowModalType = ApiMeal & ApiDrink & RecipeType;

export type RecipeArgument = string | undefined;

/*export type ApiCategories = {
    idCategory?: string;
    strCategory: string;
    strCategoryDescription?: string;
    strCategoryThumb?: string;
}*/

/*export type ApiMeal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}*/

/*export type ApiDrink = {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
}*/

/*export type FavoriteType = {
    id: string;
    titulo: string;
    imgUrl: string;
    tipo: string
}*/

