import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as appStore from './store/app.reducer';
import * as authActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private store: Store<appStore.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new authActions.AutoAuthenticate());
  }
}
