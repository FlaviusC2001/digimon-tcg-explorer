import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { DigimonCard } from '../models/digimon-card.model.ts';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites = new BehaviorSubject<DigimonCard[]>([]);
  private readonly STORAGE_KEY = 'favorites';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const favorites = (await this.storage.get(this.STORAGE_KEY)) || [];
    this.favorites.next(favorites);
  }

  getFavorites(): Observable<DigimonCard[]> {
    return this.favorites.asObservable();
  }

  async addToFavorites(card: DigimonCard) {
    const current = this.favorites.getValue();
    if (!current.find(c => c.cardnumber === card.cardnumber)) {
      current.push(card);
      await this.storage.set(this.STORAGE_KEY, current);
      this.favorites.next(current);
    }
  }

  async removeFromFavorites(card: DigimonCard) {
    const current = this.favorites.getValue().filter(c => c.cardnumber !== card.cardnumber);
    await this.storage.set(this.STORAGE_KEY, current);
    this.favorites.next(current);
  }

  async isFavorite(cardNumber: string): Promise<boolean> {
    const current = this.favorites.getValue();
    return current.some(c => c.cardnumber === cardNumber);
  }
}