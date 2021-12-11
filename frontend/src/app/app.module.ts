import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthEffects } from './auth/store/auth.effects';
import { HeaderComponent } from './header/header.component';
import { appReducer } from './store/app.reducer';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './content/home/home.component';
import { ItemsComponent } from './content/items/items.component';
import { ItemsListComponent } from './content/items/items-list/items-list.component';
import { ItemsFormComponent } from './content/items/items-form/items-form.component';
import { ItemsDetailComponent } from './content/items/items-detail/items-detail.component';
import { ItemsPlaceholderComponent } from './content/items/items-placeholder/items-placeholder.component';
import { ItemsEffects } from './content/items/items-store/items.effects';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    HomeComponent,
    ContentComponent,
    ItemsComponent,
    ItemsListComponent,
    ItemsFormComponent,
    ItemsDetailComponent,
    ItemsPlaceholderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, ItemsEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
