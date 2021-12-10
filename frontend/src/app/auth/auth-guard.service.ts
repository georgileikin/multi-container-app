import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { AuthService } from './auth.service';
import * as appStore from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<appStore.AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: appStore.AppState['auth']) => {
        return authState.user;
      }),
      map((user: UserModel) => {
        if (!!user) {
          return true;
        } else {
          return this.router.createUrlTree(['/home']);
        }
      })
    );
  }
}
