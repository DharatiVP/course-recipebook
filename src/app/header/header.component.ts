import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub : Subscription;

  constructor(private store:Store<fromApp.AppState>){}

  ngOnInit(){
    this.userSub = this.store
    .select('auth')
    .pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !!user;
      //localStorage.setItem('User Login Data',JSON.stringify(user));
      console.log(!!user);
    })
  }
  
  onSaveData(){
    //this.dataStorageService.storeRecipe();
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }
  onFetchData(){
    //this.dataStorageService.fetchRecipe().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipe());
  }
  onLogOut(){
    //this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}


