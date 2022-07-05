import { HttpClient } from '@angular/common/http';
import { Actions , ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs-compat/operator/switchMap';
import * as AuthActions from "./auth.actions";
import { environment } from 'src/environments/environment';

export interface AuthResponseData{
    idToken :	string;
    email :	string;
    refreshToken : string;
    expiresIn :	string;
    localId	: string;
    registered? : boolean;
  }

export class AuthEffects{
   authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    // switchMap((authData: AuthActions.LoginStart) => {
        
    // }
    );


   constructor(private actions$:Actions,private http:HttpClient){}
}