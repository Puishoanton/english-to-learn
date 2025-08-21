import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ModalWindowComponent } from "../modal-window/modal-window.component";
import { ICreateDeck } from '../../../models/words-to-learn';
import { IModalField } from '../../../models/modal-fields.interface';

@Component({
  selector: 'app-search-action-btn',
  imports: [FormsModule, ButtonModule, ModalWindowComponent],
  exportAs: 'searchActionBtn',
  template: `
  <div class="search-add-new">
    <input
      name="search"
      class="search"
      type="text"
      autocomplete="off"
      placeholder="Search..."
      [(ngModel)]="searchValue"
      (input)="searchChanged()"
    />
    <p-button 
      type="button" 
      label="Add New" 
      icon="pi pi-plus" 
      class="add-button" 
      (click)="openCreateCardModal()"
    >
    </p-button>
  </div>
  <app-modal-window 
    [fields]="fields" 
    [title]="title" 
    [visible]="visible" 
    (close)="closeCreateDeckModal()" 
    (save)="createDeckModal($event)"
  >
  </app-modal-window>
  `,
  styleUrl: './search-action-btn.component.scss'
})
export class SearchActionBtnComponent {
  @Input() public searchValue: string = '';
  @Input() public searchChanged: () => void = () => { };

  public fields: IModalField[] = [
    { label: 'Deck Name', value: 'name' },
    { label: 'Description', value: 'description' }
  ];
  public visible: boolean = false;
  public title: string = 'Create a new deck';

  public openCreateCardModal(): void {
    this.visible = true;
  }

  public closeCreateDeckModal() {
    this.visible = false;
  }

  public createDeckModal(deckData: ICreateDeck) {
    console.log('Deck created with data:', deckData);
    this.closeCreateDeckModal();
  }
}
