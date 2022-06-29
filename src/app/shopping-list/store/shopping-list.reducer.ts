import { Ingredient } from "../../shared/ingredient.model";
import { ADD_INGREDIENT } from "./shopping-list.actions";

import * as ShoppingListActions from "../store/shopping-list.actions"

const initialState = {
    ingredients: [
        new Ingredient('Tomatoes',5),
        new Ingredient('Apples',10)
      ]
};
export function shoppingListReducer(state = initialState,action : ShoppingListActions.AddIngredient){
  switch(action.type){
    case ADD_INGREDIENT :
        return {
            ...state,
            ingredients : [...state.ingredients,action.payload]
        };
  }
}