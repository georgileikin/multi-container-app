import { ActionReducerMap } from '@ngrx/store';

import * as authStore from '../auth/store/auth.reducer';
import * as itemsStore from '../content/items/items-store/items.reducer';

export interface AppState {
  auth: authStore.AuthState;
  items: itemsStore.ItemsState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: authStore.authReducer,
  items: itemsStore.itemsReducer
};
