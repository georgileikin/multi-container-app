import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { ItemsComponent } from './content/items/items.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ItemsListComponent } from './content/items/items-list/items-list.component';
import { ItemsDetailComponent } from './content/items/items-detail/items-detail.component';
import { ItemsFormComponent } from './content/items/items-form/items-form.component';
import {ItemsPlaceholderComponent} from "./content/items/items-placeholder/items-placeholder.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'items',
    component: ItemsComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: ItemsPlaceholderComponent, pathMatch: 'full' },
      { path: 'list', component: ItemsListComponent },
      { path: 'create', component: ItemsFormComponent },
      { path: ':id', component: ItemsDetailComponent },
      { path: ':id/edit', component: ItemsFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
