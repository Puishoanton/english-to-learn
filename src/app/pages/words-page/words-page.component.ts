import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DeckWrapperComponent } from '../../components/ui/deck-wrapper/deck-wrapper.component';

@Component({
  selector: 'app-words-page',
  imports: [MenuModule, FormsModule, CommonModule, ButtonModule, DeckWrapperComponent],
  templateUrl: './words-page.component.html',
  styleUrl: './words-page.component.scss'
})
export class WordsPageComponent {
  public searchTerm: string = '';

  public searchChanged() {
    console.log('Search:', this.searchTerm);
  }

  public addNew() {
    console.log('Add new clicked!');
  }
}
