import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/words-to-learn/card.service';
import { ICard } from '../../models/words-to-learn';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { NgClass } from '@angular/common';
import { StudyAddBtnComponent } from "../../components/ui/study-add-btn/study-add-btn.component";

@Component({
  selector: 'app-deck-page',
  imports: [CardModule, NgClass, StudyAddBtnComponent],
  template: `
   <app-study-add-btn [deckId]="deckId"></app-study-add-btn>
   <div class="card-grid">
    @for (card of cards; track card.id) {
      <p-card 
        class="flip-card"
        [ngClass]="{ 'translation': card.flipped }"
        (click)="toggleFlip(card)"
      >
        @if(card.flipped) {
          <ng-container >
             <h2>{{ card.translation }}</h2>
             <p>{{ card.translation_context }}</p>
          </ng-container>
        }@else {
          <ng-container>
            <h2>{{ card.word }}</h2>
            <p>{{ card.word_context }}</p>
          </ng-container>
        }
      </p-card>
      }
   </div>
  `,
  styleUrl: './deck-page.component.scss'
})
export class DeckPageComponent implements OnInit {
  public deckId!: string;
  public cards: (ICard & { flipped?: boolean })[] = [];

  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly cardService = inject(CardService);

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.deckId = params.get('id') ?? '';
        this.cards = this.cardService.getCards(this.deckId);
      })
  }

  public toggleFlip(card: ICard & { flipped?: boolean }): void {
    card.flipped = !card.flipped;
  }
}
