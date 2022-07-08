import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import * as fromApp from '../app/store/app.reducer';
import * as AuthActions from '../app/auth/store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // styles:[`
  // h3{
  //   color:dodgerblue;
  // }
  // `]
})
export class AppComponent implements OnInit{

  constructor(private loggingService: LoggingService,private store:Store<fromApp.AppState>){}
  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
