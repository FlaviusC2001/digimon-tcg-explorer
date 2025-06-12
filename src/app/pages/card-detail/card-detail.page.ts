import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DigimonApiService } from '../../services/digimon-api.service.ts';
import { FavoritesService } from '../../services/favorites.service.ts';
import { DigimonCard } from '../../models/digimon-card.model.ts';
import { first } from 'rxjs/operators';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'] // Corectat path-ul
})
export class CardDetailPage implements OnInit {
  card: DigimonCard | null = null;
  loading: boolean = false;
  error: string | null = null;
  isFavorite: boolean = false;
  isImagePreviewOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private digimonApi: DigimonApiService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    const cardNumber = this.route.snapshot.paramMap.get('cardNumber');
    if (cardNumber) {
      this.loadCard(cardNumber);
    }
  }

  async loadCard(cardNumber: string) {
    this.loading = true;
    try {
      this.card = await this.digimonApi.getCardDetails(cardNumber).toPromise();
      this.isFavorite = await this.favoritesService.isFavorite(cardNumber);
    } catch (error) {
      this.error = 'Failed to load card';
      const favoriteCard = await this.favoritesService.getFavorites()
        .pipe(first())
        .toPromise()
        .then(favorites => favorites.find(f => f.cardnumber === cardNumber));
      if (favoriteCard) {
        this.card = favoriteCard;
        this.isFavorite = true;
      }
    } finally {
      this.loading = false;
    }
  }

  async toggleFavorite() {
    if (this.card) {
      if (this.isFavorite) {
        await this.favoritesService.removeFromFavorites(this.card);
      } else {
        await this.favoritesService.addToFavorites(this.card);
      }
      this.isFavorite = !this.isFavorite;
    }
  }

  openImagePreview() {
    this.isImagePreviewOpen = true;
  }

  closeImagePreview() {
    this.isImagePreviewOpen = false;
  }
}