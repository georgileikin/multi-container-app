import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import * as appStore from '../store/app.reducer';
import * as authActions from './store/auth.actions';
import { UserModel } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @ViewChild('fetchTokenForm') fetchTokenForm: NgForm;
  loggedInUser: UserModel = null;
  isAuthenticated: boolean = false;

  constructor(private store: Store<appStore.AppState>) {}

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(
        map((authState: appStore.AppState['auth']) => {
          return authState.user;
        })
      )
      .subscribe((user: UserModel) => {
        this.loggedInUser = user;
        this.isAuthenticated = !!user;
      });
  }

  onSubmit() {
    this.store.dispatch(
      new authActions.Authenticate({
        username: this.fetchTokenForm.value.username,
        password: this.fetchTokenForm.value.password
      })
    );
  }

  onLogout() {
    this.store.dispatch(new authActions.ClearAuthentication());
  }

  getUserString() {
    return `${this.loggedInUser.firstName} ${this.loggedInUser.lastName} (${this.loggedInUser.username})`;
  }
}
