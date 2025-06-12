import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigimonApiService } from '../../services/digimon-api.service.ts';
import { SettingsService } from '../../services/settings.service.ts';
import { DigimonCard } from '../../models/digimon-card.model.ts';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.page.html',
  styleUrls: ['./card-list.page.scss']
})
export class CardListPage implements OnInit {
  cards: DigimonCard[] = [];
  filteredCards: DigimonCard[] = [];
  searchQuery: string = '';
  isGridMode: boolean = true;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private digimonApi: DigimonApiService,
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCards();
    this.settingsService.getIsGridMode().subscribe((gridMode: boolean) => (this.isGridMode = gridMode));
  }

  async loadCards() {
    this.loading = true;
    try {
      this.cards = await this.digimonApi.getAllCards().toPromise();
      this.filteredCards = this.cards;
    } catch (error) {
      this.error = 'Failed to load cards';
    } finally {
      this.loading = false;
    }
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    this.filteredCards = this.cards.filter(card =>
      card.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      card.cardnumber.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  goToCardDetail(card: DigimonCard) {
    this.router.navigate(['card-detail', card.cardnumber]);
  }
}