import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardDetailPage } from './card-detail.page.ts';
import { IonicModule } from '@ionic/angular';

describe('CardDetailPage', () => {
  let component: CardDetailPage;
  let fixture: ComponentFixture<CardDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardDetailPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});