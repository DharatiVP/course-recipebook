import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";

import * as ShoppingListActions from "../store/shopping-list.actions"


const initialState = {
    ingredients: [
        new Ingredient('Tomatoes',5),
        new Ingredient('Apples',10)
      ]
};
export function shoppingListReducer(state = initialState,action : any){
  switch(action.type){
    case ShoppingListActions.ADD_INGREDIENT :
        return {
            ...state,
            ingredients : [...state.ingredients,action.payload]
        };
    case ShoppingListActions.ADD_INGREDIENTS :
        return {
            ...state,
            ingredients : [...state.ingredients,...action.payload]
        };
    default :
         return state;
  }
}