import { Component, inject } from '@angular/core';
import { DeckService } from '../../../services/words-to-learn/deck.service';
import { DeckComponent } from '../deck/deck.component';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deck-wrapper',
  imports: [DeckComponent, AccordionModule, CommonModule],
  exportAs: 'DeckWrapperComponent',
  template: `
    <div class="deck-wrapper">
      @if(this.deckService.decks().length) {
        <p>Decks:</p>
        <div class="decks">
          @for (deck of deckService.decks(); track deck.id){
            <p-accordion class="deck-accordion">
              <app-deck [deck]="deck"></app-deck>
            </p-accordion>
          }
        </div>
      }
      @else {
      <div>
        <p>You do not have any decks yet.</p>
        <p>Create a new one!</p>
      </div>
      }
    </div>
  `,
  styleUrl: './deck-wrapper.component.scss'
})
export class DeckWrapperComponent {
  public readonly deckService = inject(DeckService)
}
