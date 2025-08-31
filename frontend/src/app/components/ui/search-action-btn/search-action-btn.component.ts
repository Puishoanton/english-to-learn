import { Component, effect, inject, OnInit } from '@angular/core';
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
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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
  private readonly authService = inject(AuthService)
  private readonly showToastService = inject(ShowToastService)
  private readonly router = inject(Router)
  public searchControl = new FormControl('');
  public searchValue = toSignal(
    this.searchControl.valueChanges.pipe(debounceTime(700)),
    { initialValue: '' }
  );

  public ngOnInit(): void {
    effect(() => {
      this.performSearch()
    });
  }



  public openCreateDeckModal(): void {
    if (this.authService.isLoggedIn()) {
      this.modalService.open(
        FormModalComponent,
        {
          title: 'Create a new deck',
          fields: this.getCreateDeckModalWindowFields(),
          handleSave: (createDeckDto) => this.handleSave(createDeckDto),
          handleCancel: () => this.handleCancel()
        })
    } else {
      this.router.navigate([`/`]);
    }
  }

  private performSearch() {
    this.deckService.getDecks(this.searchValue() ?? '');
  }

  private handleSave(createDeckDto: ICreateDeck) {
    this.deckService.createDeck(createDeckDto).subscribe({
      next: () => {
        this.modalService.close()
        this.showToastService.showToast('success', 'Success');
      },
      error: () => {
        this.showToastService.showToast('error', 'Server error');
      }
    });
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
