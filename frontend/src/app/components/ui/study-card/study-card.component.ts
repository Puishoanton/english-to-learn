import { Component, inject, Input } from '@angular/core';
import { ICard } from '../../../models/words-to-learn';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CardService } from '../../../services/words-to-learn/card.service';

@Component({
  selector: 'app-study-card',
  imports: [CardModule, ButtonModule],
  exportAs: 'studyCard',
  template: `
    <p-card class="study-card">
      <div>
        <h2>{{ currentCard.word }}</h2>
        <p>{{ currentCard.word_context }}</p>
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

  public deckId!: string
  @Input() public currentCard!: ICard & { study_again?: boolean }
  @Input() public cards!: (ICard & { study_again?: boolean })[]
  @Input() public currentCardIndex!: number

  public nextCard(isKnown: boolean): void {
    if (!this.currentCard) return;

    const card = this.cards[this.currentCardIndex];

    if (!card.study_again) {
      this.changeWordProgress(card.id, isKnown ? 'increase' : 'decrease');
    }

    if (!isKnown) {
      this.cards.push({ ...card, study_again: true });
    }

    this.cards.splice(this.currentCardIndex, 1);

    if (this.currentCardIndex >= this.cards.length) {
      this.currentCardIndex = 0;
    }
  }

  private changeWordProgress(cardId: string, changeValue: 'decrease' | 'increase') {
    this.cardService.changeProgress(cardId, changeValue)
  }

}
