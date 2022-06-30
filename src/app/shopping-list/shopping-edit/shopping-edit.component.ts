import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import * as ShoppingListAction from '../store/shopping-list.actions';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f')slForm:NgForm;

  subscription : Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService:ShoppingListService,private store : Store<{shoppingList : { ingredients : Ingredient[]}}>) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe((index:number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    })
  }
  onSubmit(form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updatedIngredients(this.editedItemIndex,newIngredient);
    }else{
      //this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }
  onDelete(){
    this.slService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
