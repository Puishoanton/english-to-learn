import { Component, inject, Input } from '@angular/core';
import { ICard } from '../../../models/words-to-learn';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CardService } from '../../../services/words-to-learn/card.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-study-card',
  imports: [CardModule, ButtonModule, NgClass],
  exportAs: 'studyCard',
  template: `
    <p-card class="study-card" [ngClass]="{'flipped': flipped}">
      <div class="study-card-content" >
        @if(flipped) {
          <ng-container >
            <h2>{{ currentCard.translation }}</h2>
            <p>{{ currentCard.translationContext }}</p>
          </ng-container>
        }@else {
          <ng-container>
            <h2>{{ currentCard.word }}</h2>
            <p>{{ currentCard.wordContext }}</p>
          </ng-container>
        }
        <p-button icon="pi pi-sync" class="study-card-flip" (click)="toggleFlip()"></p-button>
      </div>

      <div class="actions">
        <p-button label="Study again" class="again-btn next-btn" (click)="nextCard(false)"></p-button>
        <p-button label="I know" class="know-btn next-btn" (click)="nextCard(true)"></p-button>
      </div>
    </p-card>
  `,
  styleUrl: './study-card.component.scss'
})
export class StudyCardComponent {
  private readonly cardService = inject(CardService);

  @Input({ required: true }) public deckId!: string
  @Input() public currentCard!: ICard & { study_again?: boolean }
  @Input() public cards!: (ICard & { study_again?: boolean })[]
  @Input() public currentCardIndex!: number
  public flipped = false

  public nextCard(isKnown: boolean): void {
    if (!this.currentCard) return;

    const card = this.cards[this.currentCardIndex];

    if (!card.study_again) {
      this.changeWordProgress(card.id, isKnown ? 'Increase' : 'Decrease');
    }

    if (!isKnown) {
      this.cards.push({ ...card, study_again: true });
    }

    this.cards.splice(this.currentCardIndex, 1);

    if (this.currentCardIndex >= this.cards.length) {
      this.currentCardIndex = 0;
    }
  }
  
  public toggleFlip(): void {
    this.flipped = !this.flipped
  }

  private changeWordProgress(cardId: string, changeValue: 'Decrease' | 'Increase',) {
    this.cardService.changeProgress(cardId, changeValue, this.deckId).subscribe()
  }
}
