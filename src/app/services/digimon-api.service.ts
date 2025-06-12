import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DigimonCard } from '../models/digimon-card.model.ts';

@Injectable({
  providedIn: 'root'
})
export class DigimonApiService {
  private readonly BASE_URL = '/api/'; // Proxy pentru a evita CORS

  constructor(private http: HttpClient) {}

  getAllCards(): Observable<DigimonCard[]> {
    return this.http
      .get<DigimonCard[]>(`${this.BASE_URL}getAllCards.php`, {
        params: {
          sort: 'name',
          series: 'Digimon Card Game',
          sortdirection: 'asc'
        }
      })
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching cards:', error);
          return throwError(() => new Error('Failed to fetch cards'));
        })
      );
  }

  getCardDetails(cardNumber: string): Observable<DigimonCard> {
    return this.http
      .get<DigimonCard[]>(`${this.BASE_URL}search.php`, {
        params: { card: cardNumber }
      })
      .pipe(
        map((response: any[]) => response[0]),
        catchError((error: any) => {
          console.error('Error fetching card details:', error);
          return throwError(() => new Error('Failed to fetch card details'));
        })
      );
  }
}