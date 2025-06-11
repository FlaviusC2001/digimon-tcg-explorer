import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { DigimonApiService } from 'src/app/services/digimon-api.service.ts';
import { SettingsService } from 'src/app/services/settings.service.ts';
import { DigimonCard } from 'src/app/models/digimon-card.model.ts';
import { trigger, style, animate, transition, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.page.html',
  styleUrls: ['./card-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        query('ion-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class CardListPage implements OnInit {
  cards: DigimonCard[] = [];
  filteredCards: DigimonCard[] = [];
  searchQuery = '';
  isGridMode = true;

  constructor(
    private api: DigimonApiService,
    private settings: SettingsService
  ) {}

  async ngOnInit() {
    this.isGridMode = await this.settings.isGridMode();
    this.api.getAllCards().subscribe({
      next: (data) => {
        this.cards = data;
        this.filteredCards = data;
      },
      error: (err) => {
        console.error('Error fetching cards', err);
      }
    });
  }

  onSearchChange() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCards = this.cards.filter(
      (card) =>
        card.name.toLowerCase().includes(query) ||
        card.cardnumber.toLowerCase().includes(query)
    );
  }

  getImage(card: DigimonCard): string {
    return card.image_url || `https://images.digimoncard.io/images/cards/${card.cardnumber}.jpg`;
  }
}