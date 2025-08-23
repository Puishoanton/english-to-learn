import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IModalField } from '../../../models/modal-props.interface';
import { GlobalModalWindowService } from '../../../services/global-modal-window.service';
import { FormModalComponent } from '../modals/form-modal/form-modal.component';
import { DeckService } from '../../../services/words-to-learn/deck.service';
import { ICreateDeck } from '../../../models/words-to-learn';
import { Toast } from 'primeng/toast';
import { ShowToastService } from '../../../services/show-toast.service';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-action-btn',
  imports: [ReactiveFormsModule, ButtonModule, Toast],
  exportAs: 'searchActionBtn',
  template: `
  <div class="search-add-new">
    <input
      name="search"
      class="search"
      type="text"
      autocomplete="off"
      placeholder="Search..."
      [formControl]="searchControl"
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
export class SearchActionBtnComponent implements OnInit {
  private readonly modalService = inject(GlobalModalWindowService<ICreateDeck>)
  private readonly deckService = inject(DeckService)
  private readonly showToastService = inject(ShowToastService)
  private readonly destroyRef = inject(DestroyRef);
  public searchControl = new FormControl('');
  public searchValue: string = '';

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(700),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        this.performSearch(value ?? '');
      });
  }

  private performSearch(search: string) {
    this.deckService.getDecks(search)
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
