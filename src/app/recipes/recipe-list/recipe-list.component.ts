import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component ({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  subscription: Subscription

    constructor(private recipeService: RecipeService,
                private router: Router,
                private route: ActivatedRoute) {}

    ngOnInit() {
      // listen to recipeChanged event from service
      this.subscription = this.recipeService.recipesChanged.subscribe(
        // receive a new array of recipes
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
      this.recipes = this.recipeService.getRecipes();
    }
    // allows us to navigate to this route
    // to use relativeTo we need to know our current route - ActivatedRoute
    onNewRecipe() {
      this.router.navigate(['new'], {relativeTo: this.route});
    }

    // clear up services
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}
