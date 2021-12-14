import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {expand, map} from 'rxjs';

import * as appStore from '../../../store/app.reducer';
import { ItemsModel } from '../items.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  items: ItemsModel[];

  constructor(private store: Store<appStore.AppState>) {}

  ngOnInit(): void {
    this.store
      .select('items')
      .pipe(
        map((itemsState: appStore.AppState['items']) => {
          return itemsState.list;
        })
      )
      .subscribe((itemList: ItemsModel[]) => {
        this.items = itemList;
      });
  }
}
