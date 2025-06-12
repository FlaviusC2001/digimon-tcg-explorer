import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service.ts';
import { SettingsService } from '../../services/settings.service.ts';
import { DigimonCard } from '../../models/digimon-card.model.ts';
import { IonRow, IonHeader, IonCardHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnInit {
  favorites: DigimonCard[] = [];
  filteredFavorites: DigimonCard[] = [];
  searchQuery: string = '';
  isGridMode: boolean = true;

  constructor(
    private favoritesService: FavoritesService,
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.favoritesService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
      this.filteredFavorites = favorites;
    });
    this.settingsService.getIsGridMode().subscribe(gridMode => (this.isGridMode = gridMode));
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    this.filteredFavorites = this.favorites.filter(card =>
      card.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      card.cardnumber.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  goToCardDetail(card: DigimonCard) {
    this.router.navigate(['card-detail', card.cardnumber]);
  }
}