import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IModalField } from '../../../models/modal-fields.interface';
import { GlobalModalWindowService } from '../../../services/global-modal-window.service';
import { FormModalComponent } from '../modals/form-modal/form-modal.component';

@Component({
  selector: 'app-search-action-btn',
  imports: [FormsModule, ButtonModule],
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
  </div>
  `,
  styleUrl: './search-action-btn.component.scss'
})
export class SearchActionBtnComponent {
  private readonly modalService = inject(GlobalModalWindowService)
  @Input() public searchValue: string = '';
  @Input() public searchChanged: () => void = () => { };

  public openCreateDeckModal(): void {
    this.modalService.open(
      FormModalComponent,
      {
        title: 'Create a new deck',
        fields: this.getEditCardModalWindowFields(),
        handleSave: (formData: Record<string, string>) => this.handleSave(formData),
        handleCancel: () => this.handleCancel()
      })
  }

  private handleSave(formData: Record<string, string>) {
    console.log(formData);
    this.modalService.close()
  }

  private handleCancel() {
    this.modalService.close()
  }

  private getEditCardModalWindowFields(): IModalField[] {
    return [
      { label: 'Deck Name', value: 'name' },
      { label: 'Description', value: 'description' }
    ]
  }
}
