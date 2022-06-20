import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";


@Component({
  selector:'app-header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub : Subscription;

  constructor(private dataStorageService:DataStorageService,private authService:AuthService){}

  ngOnInit(){
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      //localStorage.setItem('User Login Data',JSON.stringify(user));
      console.log(!!user);
    })
  }
  
  onSaveData(){
    this.dataStorageService.storeRecipe();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipe().subscribe();
  }
  onLogOut(){
    this.authService.logout();
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}


