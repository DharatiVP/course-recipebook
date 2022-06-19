import { RecipeService } from './../recipes/recipe.service';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class DataStorageService{
  constructor(private http:HttpClient,private recipeService:RecipeService){}

  storeRecipe(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://my-first-app-4bd2b-default-rtdb.firebaseio.com/recipes.json',recipes)
    .subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipe(){
    return this.http.get<Recipe[]>
      ('https://my-first-app-4bd2b-default-rtdb.firebaseio.com/recipes.json')
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    )
  }
}
