import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/words-to-learn/card.service';
import { ICard } from '../../models/words-to-learn';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StudyCardComponent } from "../../components/ui/study-card/study-card.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-study-words-page',
  imports: [ButtonModule, CardModule, StudyCardComponent],
  template: `
  @if(currentCard) {
    <app-study-card [cards]="cards" [currentCard]="currentCard" [currentCardIndex]="currentCardIndex"></app-study-card>
  }@else {
    <div class="no-cards">
      <p >All cards studied!</p>
      <p-button label="Go back" icon="pi pi-chevron-left" class="action-btn" (click)="goBack()"></p-button>
    </div>
  }

  `,
  styleUrl: './study-words-page.component.scss',
})
export class StudyWordsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly cardService = inject(CardService)

  public deckId!: string
  public cards: ICard[] = []
  public currentCardIndex: number = 0

  public get currentCard(): ICard | null {
    return this.cards[this.currentCardIndex] || null;
  }

  public ngOnInit(): void {
    this.deckId = this.route.snapshot.paramMap.get('id')!
    this.cards = this.cardService.getCards(this.deckId);
    this.shuffleCards();
  }

  private shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  public goBack(): void {
    this.location.back();
  }
}
