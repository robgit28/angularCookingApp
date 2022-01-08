import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model'

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
];
  // get ingredients and slice to new array
  getIngredients() {
    return this.ingredients.slice();
  }
  // get ingredient for editing
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  // push new ingredient to array and next(emit) the change to the array
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  /// loop through ingreidents and call above method
  addIngredients(ingredients: Ingredient[]) {
    //for (let ingredient of ingredients) {
    //  this.addIngredient(ingredient);
    //}
    // turn array into list & next(emit) the change
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  //edit our ingredients
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  // delete selected ingredient
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
