import { Component, inject, Input } from '@angular/core';
import { ICard } from '../../../models/words-to-learn';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
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
  private readonly route = inject(ActivatedRoute);

  public deckId!: string
  @Input() public currentCard!: ICard
  @Input() public cards!: ICard[]
  @Input() currentCardIndex!: number

  public nextCard(isKnown: boolean): void {
    if (!this.currentCard) return

    const card = this.cards[this.currentCardIndex];

    if (!isKnown) {
      this.cards.push(card);
    }

    this.cards.splice(this.currentCardIndex, 1);

    if (this.currentCardIndex >= this.cards.length) {
      this.currentCardIndex = 0;
    }
  }
}
