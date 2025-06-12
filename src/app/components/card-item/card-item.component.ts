import { Component, Input } from '@angular/core';
import { DigimonCard } from '../../models/digimon-card.model.ts';
import { IonCard } from "@ionic/angular/standalone";

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {
  @Input() card!: DigimonCard;
}
