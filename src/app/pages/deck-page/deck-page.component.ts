import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/words-to-learn/card.service';
import { ICard, ICreateCard } from '../../models/words-to-learn';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { NgClass } from '@angular/common';
import { StudyAddBtnComponent } from "../../components/ui/study-add-btn/study-add-btn.component";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ModalWindowComponent } from "../../components/ui/modal-window/modal-window.component";
import { IModalField } from '../../models/modal-fields.interface';

@Component({
  selector: 'app-deck-page',
  imports: [CardModule, NgClass, StudyAddBtnComponent, ButtonModule, DialogModule, ModalWindowComponent],
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
    <p-card class="flip-card add-card" (click)="openCreateCardModal()">create new card</p-card>
    <app-modal-window [fields]="fields" [visible]="visible" (close)="closeCreateCardModal()" (save)="createCardModal($event)" [title]='title'></app-modal-window>
   </div>
  `,
  styleUrl: './deck-page.component.scss'
})
export class DeckPageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly cardService = inject(CardService);

  public deckId!: string;
  public cards: (ICard & { flipped?: boolean })[] = [];
  public visible: boolean = false;
  public title: string = 'Create a new card to learn';
  public fields: IModalField[] = [
    { label: 'Word', value: 'word' },
    { label: 'Word Context', value: 'word_context' },
    { label: 'Translation', value: 'translation' },
    { label: 'Translation Context', value: 'translation_context' }
  ];

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

  public openCreateCardModal(): void {
    this.visible = true;
  }

  public closeCreateCardModal(): void {
    this.visible = false;
  }

  public createCardModal(card: ICreateCard): void {
    card.deckId = this.deckId;
    console.log(card);
    this.closeCreateCardModal();
  }
}
