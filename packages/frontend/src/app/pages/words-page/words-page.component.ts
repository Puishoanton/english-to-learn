import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DeckWrapperComponent } from '../../components/ui/deck-wrapper/deck-wrapper.component';
import { SearchActionBtnComponent } from '../../components/ui/search-action-btn/search-action-btn.component';

@Component({
  selector: 'app-words-page',
  imports: [MenuModule, FormsModule, CommonModule, ButtonModule, DeckWrapperComponent, SearchActionBtnComponent],
  template: `
    <app-search-action-btn></app-search-action-btn>
    <app-deck-wrapper></app-deck-wrapper>
  `,
  styles: `
  :host {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
  `
})
export class WordsPageComponent {
}
