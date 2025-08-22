import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IModalField } from '../../../models/modal-props.interface';
import { GlobalModalWindowService } from '../../../services/global-modal-window.service';
import { FormModalComponent } from '../modals/form-modal/form-modal.component';
import { DeckService } from '../../../services/words-to-learn/deck.service';
import { ICreateDeck } from '../../../models/words-to-learn';
import { Toast } from 'primeng/toast';
import { ShowToastService } from '../../../services/show-toast.service';

@Component({
  selector: 'app-search-action-btn',
  imports: [FormsModule, ButtonModule, Toast],
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
      (click)="openCreateDeckModal()"
    >
    </p-button>
    <p-toast/>
  </div>
  `,
  styleUrl: './search-action-btn.component.scss'
})
export class SearchActionBtnComponent {
  private readonly modalService = inject(GlobalModalWindowService<ICreateDeck>)
  private readonly deckService = inject(DeckService)
  private readonly showToastService = inject(ShowToastService)
  public searchValue: string = '';

  public searchChanged() {
    console.log('Search:', this.searchValue);
  }

  public addNew() {
    console.log('Add new clicked!');
  }

  public openCreateDeckModal(): void {
    this.modalService.open(
      FormModalComponent,
      {
        title: 'Create a new deck',
        fields: this.getCreateDeckModalWindowFields(),
        handleSave: (createDeckDto) => this.handleSave(createDeckDto),
        handleCancel: () => this.handleCancel()
      })
  }

  private handleSave(createDeckDto: ICreateDeck) {
    const { status, message } = this.deckService.createDeck(createDeckDto)
    if (status === 200) {
      this.modalService.close()
      this.showToastService.showToast('success', message);
      return
    }
    this.showToastService.showToast('error', message);
  }

  private handleCancel() {
    this.modalService.close()
  }

  private getCreateDeckModalWindowFields(): IModalField[] {
    return [
      { label: 'Deck Name', value: 'name' },
      { label: 'Description', value: 'description' }
    ]
  }
}
