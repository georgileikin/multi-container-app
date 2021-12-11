import { Action } from '@ngrx/store';

import { ItemsModel } from '../items.model';

export const FETCH_ITEMS = '[Items] Fetch items';
export const FETCH_ITEMS_SUCCESS = '[Items] Fetch items success';

export const FETCH_ITEM = '[Items] Fetch item';

export class FetchItems implements Action {
  readonly type: typeof FETCH_ITEMS = FETCH_ITEMS;
}

export class FetchItemsSuccess implements Action {
  readonly type: typeof FETCH_ITEMS_SUCCESS = FETCH_ITEMS_SUCCESS;

  constructor(public payload: ItemsModel[]) {}
}

export class FetchItem implements Action {
  readonly type: typeof FETCH_ITEM = FETCH_ITEM;

  constructor(public payload: { uuid: string }) {}
}

export type itemsActions = FetchItems | FetchItemsSuccess | FetchItem;
