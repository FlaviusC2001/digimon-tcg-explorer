import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component.ts';
import { AppRoutingModule } from './app-routing.module.ts';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav/bottom-nav.component.ts';
import { CardItemComponent } from './components/card-item/card-item.component.ts';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HomePage } from './pages/home/home.page.ts';
import { CardListPage } from './pages/card-list/card-list.page.ts';
import { FavoritesPage } from './pages/favorites/favorites.page.ts';
import { SettingsPage } from './pages/settings/settings.page.ts';
import { CardDetailPage } from './pages/card-detail/card-detail.page.ts';

@NgModule({
  declarations: [
    AppComponent,
    BottomNavComponent,
    CardItemComponent,
    HomePage,
    CardListPage,
    FavoritesPage,
    SettingsPage,
    CardDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}