import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as appStore from '../store/app.reducer';
import * as authActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logoutTimer: number;

  constructor(private store: Store<appStore.AppState>) {}

  setLogoutTimer(expiresIn: number) {
    console.log(expiresIn);
    this.logoutTimer = window.setTimeout(() => {
      this.store.dispatch(new authActions.ClearAuthentication());
    }, expiresIn);
  }

  clearLogoutTimer() {
    this.logoutTimer = null;
  }
}
