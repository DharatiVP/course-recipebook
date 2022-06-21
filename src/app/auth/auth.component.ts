import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy{

  @ViewChild(PlaceholderDirective) alertHost : PlaceholderDirective;

  isLoginMode = true;
  isLoading = false;
  error:string = null;
  private closeSub : Subscription; 
  constructor(private authServise:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver) { }


  
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs : Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authServise.login(email,password);
    }else{
      authObs = this.authServise.signup(email,password);
    }

    authObs.subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      });

      form.reset();

  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }  
  }

  private showErrorAlert(message:string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
