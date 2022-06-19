import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{

  recipeChanged = new Subject<Recipe[]>();

  // private recipes:Recipe[] = [
  //     new Recipe('Choco Coockies','Sweet Choco Cookie','https://joyfoodsunshine.com/wp-content/uploads/2018/02/best-chocolate-chip-cookies-recipe-1.jpg',[
  //     new Ingredient('Choco',1),
  //     new Ingredient('Coockies',10)
  //   ]),
  //   new Recipe('Cheese Pizza','A Super Tasty Pizza','https://cafedelites.com/wp-content/uploads/2018/01/15-Minute-Mozzarella-Chicken-IMAGE-50-500x500.jpg',[
  //     new Ingredient('Cheese',10),
  //     new Ingredient('Pizza',10)
  //   ])
  // ];

private recipes: Recipe[] = [];

constructor(private slService:ShoppingListService){}


  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(index:number){
    return this.recipes[index];
  }
  addIngrediantsToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
