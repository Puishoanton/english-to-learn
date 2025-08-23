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
})
export class WordsPageComponent {
}
