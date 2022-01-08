import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(Name: string, Description: string, ImagePath: string, ingredients: Ingredient[]) {
    this.name = Name;
    this.description = Description;
    this.imagePath = ImagePath;
    this.ingredients = ingredients;
  }
}
