import { Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DeckService } from '../../../services/words-to-learn/deck.service';

@Component({
  selector: 'app-deck-page-action-btn',
  imports: [ButtonModule],
  exportAs: 'deckPageACtionBtn',
  template: `
    <div class="deck-page-action-btn">
      <p-button type="button" label="Study words" icon="pi pi-book" class="action-btn" (click)="study()"></p-button>
      <p-button type="button" label="Go back" icon="pi pi-chevron-left" class="action-btn" (click)="goBack()"></p-button>
    </div>
  `,
  styleUrl: './deck-page-action-btn.component.scss'
})
export class DeckPageActionBtn {
  private readonly router = inject(Router)
  private readonly location = inject(Location);
  private readonly deckService = inject(DeckService);
  @Input() public deckId!: string;

  public goBack() {
    this.location.back();
    this.deckService.getDecks().subscribe()
  };

  public study() {
    this.router.navigate([`/words-to-learn/deck/${this.deckId}/study`]);
  };
}
