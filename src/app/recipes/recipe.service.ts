
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Pizza Napoletana',
    //         'Born in Napoli, la pizza Napoletana is one of the most famous types of Italian pizza.', 
    //         'https://www.eataly.com/wp/wp-content/uploads/2018/08/ech-quattro-mani-matt-roan-pizza-horizontal-web.jpg',
    //         [
    //             new Ingredient('Flour', 1000),
    //             new Ingredient('Water', 600)
    //         ]
    //         ),
    //     new Recipe(
    //         'Vegetable Burger', 
    //         'Delicious, lip-smacking and crunchy these words will only remind you of this Burger',
    //         'https://static.toiimg.com/thumb/52532689.cms?imgsize=150611&width=509&height=340',
    //         [
    //             new Ingredient('Bun', 2),
    //             new Ingredient('Potato', 4)
    //         ]
    //         )
    // ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}