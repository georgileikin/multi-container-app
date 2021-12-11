import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as itemsStore from './items-store/items.reducer';
import * as itemsActions from './items-store/items.actions';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  constructor(private store: Store<itemsStore.ItemsState>) {}

  ngOnInit(): void {
    this.store.dispatch(new itemsActions.FetchItems());
  }
}
