import { ActionReducerMap } from '@ngrx/store';

import * as authStore from '../auth/store/auth.reducer';

export interface AppState {
  auth: authStore.AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: authStore.authReducer
};
