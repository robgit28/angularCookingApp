import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Roasted Asparagus',
      'Oven-Roasted Asparagus Recipe',
      'https://thestayathomechef.com/wp-content/uploads/2012/12/Roasted-Asparagus-1-small.jpg',
       [
         new Ingredient('Packet of asparagus spears', 1),
         new Ingredient('Extra virgin olive oil', 2),
         new Ingredient('Cloves garlic, minced', 2),
         new Ingredient('Salt', 1),
         new Ingredient('Balsamic vinegar', 1)
       ]),
    new Recipe(
      'Caramelised Brussels sprouts',
      'Caramelised Brussels sprouts with Chinese sausage',
      'https://img.delicious.com.au/gqRDgMZ8/w759-h506-cfill/del/2016/06/caramelised-brussels-sprouts-with-chinese-sausage-31319-2.jpg',
      [
        new Ingredient('Slices of bacon', 6),
        new Ingredient('Brussels sprouts', 20),
        new Ingredient('Real maple syrup', 2),
        new Ingredient('Shallot', 1),
        new Ingredient('Salt', 1),
        new Ingredient('Olive oil', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    // push our new recipe to the copy of the original array
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    // update our new recipe to the copy of the original array
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    // update our action to the copy of the original array
    this.recipesChanged.next(this.recipes.slice());
  }

}
