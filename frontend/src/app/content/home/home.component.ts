import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import * as appStore from '../../store/app.reducer';
import { UserModel } from '../../auth/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
        this.isAuthenticated = !!user;
      });
  }
}
