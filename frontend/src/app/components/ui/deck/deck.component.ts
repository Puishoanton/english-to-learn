import { Component, Input } from '@angular/core';
import { IDeck } from '../../../models/words-to-learn';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-deck',
  imports: [AccordionModule, ButtonModule, RouterLink],
  exportAs: 'DeckComponent',
  template: `
  <p-accordion-panel [value]="deck.id">
  <div class="deck-header">
    <p-button class="deck-navigate" [label]="deck.name" [routerLink]="['/words-to-learn/deck', deck.id]"></p-button>
    <p class="deck-info">{{deck.cards.length ? 'Cards for today: ' + deck.cards.length : 'No cards added yet'}}</p>
    <p-accordion-header class="deck-expand-btn">
      <ng-template #toggleicon let-active="active">
        @if (active) {
        <p>Collapse</p>
        } @else {
        <p>Expand</p>
        }
      </ng-template>
    </p-accordion-header>
  </div>
  @for (card of deck.cards; track card.id){
  <p-accordion-content>
    <p>{{ card.word }}</p>
  </p-accordion-content>
  }
</p-accordion-panel>
  `,
  styleUrl: './deck.component.scss'
})
export class DeckComponent {
  @Input() public deck!: IDeck;
}
