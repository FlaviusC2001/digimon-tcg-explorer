import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service.ts';
import { SettingsService } from 'src/app/services/settings.service.ts';
import { DigimonCard } from 'src/app/models/digimon-card.model.ts';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class FavoritesPage implements OnInit {
  favorites: DigimonCard[] = [];
  filtered: DigimonCard[] = [];
  searchQuery = '';
  isGridMode = true;

  constructor(
    private favService: FavoritesService,
    private settings: SettingsService
  ) {}

  async ngOnInit() {
    this.isGridMode = await this.settings.isGridMode();
    this.favorites = await this.favService.getFavorites();
    this.filtered = [...this.favorites];
  }

  onSearchChange() {
    const query = this.searchQuery.toLowerCase();
    this.filtered = this.favorites.filter(
      (card) =>
        card.name.toLowerCase().includes(query) ||
        card.cardnumber.toLowerCase().includes(query)
    );
  }

  getImage(card: DigimonCard): string {
    return card.image_url || `https://images.digimoncard.io/images/cards/${card.cardnumber}.jpg`;
  }
}