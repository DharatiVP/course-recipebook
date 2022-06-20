import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData{
  idToken :	string;
  email :	string;
  refreshToken : string;
  expiresIn :	string;
  localId	: string;
  registered? : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  user = new BehaviorSubject<User>(null);

  constructor(private http:HttpClient,private router:Router) { }
  
  //sign up method
  signup(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZTS7RmkCa5QFz36wJH5BLdgi_nlg8AWs',{
      email:email,
      password:password,
      returnSecureToken: true
    })
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
      })
    );
  }


  //log in method
  login(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZTS7RmkCa5QFz36wJH5BLdgi_nlg8AWs',{
      email:email,
      password:password,
      returnSecureToken: true
    })
    .pipe(catchError(this.handleError),
    tap(resData => {
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    })
    );
  }


  //log out method
  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
  }


  //handle authentication
  private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
      );
    this.user.next(user);
  }


  //handle error
  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An Unknown Error occurred!';
        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message){
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already!';
          break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist';
          break;
          case 'INVALID_PASSWORD':
            errorMessage = 'The password is invalid or the user does not have a password';
          break;
          case 'USER_DISABLED':
            errorMessage = 'The user account has been disabled by an administrator';
          break;
        }
        return throwError(errorMessage);
  }
}
