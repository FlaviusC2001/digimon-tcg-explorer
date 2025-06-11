import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DigimonCard } from '../models/digimon-card.model.ts';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly key = 'favorites';
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getFavorites(): Promise<DigimonCard[]> {
    return (await this._storage?.get(this.key)) || [];
  }

  async isFavorite(cardNumber: string): Promise<boolean> {
    const favs = await this.getFavorites();
    return favs.some(card => card.cardnumber === cardNumber);
  }

  async add(card: DigimonCard): Promise<void> {
    const favs = await this.getFavorites();
    const updated = [...favs.filter(c => c.cardnumber !== card.cardnumber), card];
    await this._storage?.set(this.key, updated);
  }

  async remove(cardNumber: string): Promise<void> {
    const favs = await this.getFavorites();
    const updated = favs.filter(c => c.cardnumber !== cardNumber);
    await this._storage?.set(this.key, updated);
  }
}