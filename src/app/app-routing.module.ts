import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './pages/home/home.page.ts';
import { CardListPage } from './pages/card-list/card-list.page.ts';
import { FavoritesPage } from './pages/favorites/favorites.page.ts';
import { SettingsPage } from './pages/settings/settings.page.ts';
import { CardDetailPage } from './pages/card-detail/card-detail.page.ts';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'card-list', component: CardListPage },
  { path: 'card-detail/:cardNumber', component: CardDetailPage },
  { path: 'favorites', component: FavoritesPage },
  { path: 'settings', component: SettingsPage },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}