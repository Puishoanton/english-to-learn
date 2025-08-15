import { Component, inject, OnInit } from '@angular/core';
import { IDeck } from '../../../models/words-to-learn';
import { DeckService } from '../../../services/words-to-learn/deck.service';
import { DeckComponent } from '../deck/deck.component';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-deck-wrapper',
  imports: [DeckComponent, AccordionModule],
  exportAs: 'DeckWrapperComponent',
  template: `
    <div class="deck-wrapper">
    @if(decks.length){}
    @else {
    <div>
      <p>Create new deck</p>
      <button pButton type="button" label="Add New" icon="pi pi-plus" (click)="addNewDeck()"></button>
    </div>
    }

    <p-accordion class="deck-accordion">
      <p>Decks:</p>
      @for (deck of decks; track deck.id){
      <app-deck [deck]=" deck"></app-deck>
      }
    </p-accordion>
    </div>
  `,
  styleUrl: './deck-wrapper.component.scss'
})
export class DeckWrapperComponent implements OnInit {
  public decks: IDeck[] = [];
  private readonly deckService = inject(DeckService);


  public addNewDeck(): void { }

  public ngOnInit(): void {
    this.decks = this.deckService.getDecks()
  }
}
