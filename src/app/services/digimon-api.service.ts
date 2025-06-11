import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { DigimonCard } from '../models/digimon-card.model.ts';

@Injectable({ providedIn: 'root' })
export class DigimonApiService {
  private readonly baseUrl = 'https://digimoncard.io/api-public/';
  private readonly cacheKey = 'digimon_cards';
  constructor(
    private http: HttpClient,
    private storage: Storage) {
      this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  getAllCards(): Observable<DigimonCard[]> {
    return new Observable((observer: { next: (value: DigimonCard[]) => void; complete: () => void; error: (err: any) => void; }) => {
      this.storage?.get(this.cacheKey).then((cachedData) => {
        if (cachedData) {
          observer.next(cachedData);
        }
        const params = new HttpParams()
          .set('sort', 'name')
          .set('series', 'Digimon Card Game')
          .set('sortdirection', 'asc');

        this.http
          .get<DigimonCard[]>(`${this.baseUrl}getAllCards.php`, { params })
          .subscribe({
            next: (data) => {
              this.storage?.set(this.cacheKey, data); // Salvează în cache
              if (!cachedData) {
                observer.next(data);
              }
              observer.complete();
            },
            error: (err) => observer.error(err)
          });
      });
    });
  }

  getCardDetails(cardNumber: string): Observable<DigimonCard[]> {
    const params = new HttpParams().set('card', cardNumber);
    return this.http.get<DigimonCard[]>(`${this.baseUrl}search.php`, { params });
  }
}