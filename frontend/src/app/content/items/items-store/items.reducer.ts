import * as authActions from '../../../auth/store/auth.actions';
import * as itemsActions from './items.actions';

import { ItemsModel } from '../items.model';

export interface ItemsState {
  list: ItemsModel[];
  selected: ItemsModel;
}

const initialState: ItemsState = {
  list: null,
  selected: null
};

export function itemsReducer(
  state: ItemsState = initialState,
  action: itemsActions.itemsActions | authActions.ClearAuthentication
) {
  switch (action.type) {
    case itemsActions.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    case authActions.CLEAR_AUTHENTICATION:
      return {
        ...state,
        list: null,
        selected: null
      };
    default:
      return {
        ...state
      };
  }
}
