import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page.ts').then((m) => m.HomePage)
  },
  {
    path: 'card-list',
    loadComponent: () => import('./pages/card-list/card-list.page.ts').then((m) => m.CardListPage)
  },
  {
    path: 'card-detail/:id',
    loadComponent: () => import('./pages/card-detail/card-detail.page.ts').then((m) => m.CardDetailPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page.ts').then((m) => m.FavoritesPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page.ts').then((m) => m.SettingsPage)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}