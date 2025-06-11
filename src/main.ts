import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app-routing.module.ts';
import { AppComponent } from './app/app.component.ts';
import { Storage } from '@ionic/storage-angular';
import { environment } from './environments/environment.ts';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(APP_ROUTES),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage
  ]
}).catch((err) => console.error(err));