import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { ItemsModel } from '../items.model';
import * as itemsActions from './items.actions';

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  fetchItems = createEffect(() =>
    this.actions$.pipe(
      ofType(itemsActions.FETCH_ITEMS),
      switchMap((itemsAction: itemsActions.FetchItem) => {
        return this.httpClient.get<ItemsModel[]>('/api/items/');
      }),
      map((items: ItemsModel[]) => {
        return new itemsActions.FetchItemsSuccess(items);
      })
    )
  );
}
