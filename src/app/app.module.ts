import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component.ts';
import { AppRoutingModule } from './app-routing.module.ts';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component.ts';
import { CardItemComponent } from './components/card-item/card-item.component.ts';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CardDetailPage } from './pages/card-detail/card-detail.page.ts';

@NgModule({
  declarations: [
    AppComponent,
    BottomNavComponent,
    CardItemComponent,
    CardDetailPage,
    // ... alte pagini
  ],
  imports: [
    IonicStorageModule.forRoot(),
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