import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-action-btn',
  imports: [FormsModule, ButtonModule],
  exportAs: 'searchActionBtn',
  template: `
  <div class="search-add-new">
    <input name="search" class="search" type="text" autocomplete="off" placeholder="Search..." [(ngModel)]="searchValue"
      (input)="searchChanged()" styleClass="w-36 focus:w-64 transition-all duration-300 px-2 py-1 border rounded" />

    <p-button type="button" label="Add New" icon="pi pi-plus" class="add-button" (click)="addNew()"></p-button>
  </div>
  `,
  styleUrl: './search-action-btn.component.scss'
})
export class SearchActionBtnComponent {
  @Input() public searchValue: string = '';
  @Input() public searchChanged: () => void = () => { };
  @Input() public addNew: () => void = () => { };

}
