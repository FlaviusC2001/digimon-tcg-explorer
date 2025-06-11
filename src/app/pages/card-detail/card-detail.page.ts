import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DigimonApiService } from 'src/app/services/digimon-api.service.ts';
import { FavoritesService } from 'src/app/services/favorites.service.ts';
import { DigimonCard } from 'src/app/models/digimon-card.model.ts';
import { Haptics, ImpactStyle } from '@capacitor/haptics.ts';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class CardDetailPage implements OnInit {
  card?: DigimonCard;
  isFavorite = false;
  loading = true;
  isImagePreviewOpen = false;

  constructor(
    private route: ActivatedRoute,
    private api: DigimonApiService,
    private favs: FavoritesService
  ) {}

  ngOnInit() {
    const cardNumber = this.route.snapshot.paramMap.get('id');
    if (cardNumber) {
      this.api.getCardDetails(cardNumber).subscribe({
        next: async (res) => {
          this.card = res[0];
          this.isFavorite = await this.favs.isFavorite(this.card.cardnumber);
          this.loading = false;
        },
        error: async () => {
          const favList = await this.favs.getFavorites();
          this.card = favList.find((c) => c.cardnumber === cardNumber);
          this.loading = false;
        }
      });
    }
  }

  getImage(): string {
    return this.card?.image_url || `https://images.digimoncard.io/images/cards/${this.card?.cardnumber}.jpg`;
  }

  async toggleFavorite() {
    if (!this.card) return;
    if (this.isFavorite) {
      await this.favs.remove(this.card.cardnumber);
      this.isFavorite = false;
    } else {
      await this.favs.add(this.card);
      this.isFavorite = true;
    }
    await Haptics.impact({ style: ImpactStyle.Medium }); // Feedback haptic
  }

  openImagePreview() {
    this.isImagePreviewOpen = true;
  }
}