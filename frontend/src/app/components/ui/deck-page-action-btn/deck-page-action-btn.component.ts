import { Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DeckService } from '../../../services/words-to-learn/deck.service';
import { IModalField } from '../../../models/modal-props.interface';
import { GlobalModalWindowService } from '../../../services/global-modal-window.service';
import { ShowToastService } from '../../../services/show-toast.service';
import { IEditDeck } from '../../../models/words-to-learn';
import { FormModalComponent } from '../modals/form-modal/form-modal.component';

@Component({
  selector: 'app-deck-page-action-btn',
  imports: [ButtonModule],
  exportAs: 'deckPageACtionBtn',
  template: `
    <div class="deck-page-action-btn">
      <p-button type="button" label="Study words" icon="pi pi-book" class="action-btn" (click)="study()"></p-button>
      <div class="buttons-container">
        <p-button type="button" label="Edit deck" icon="pi pi-pencil" class="action-btn" (click)="openEditDeckModal()"></p-button>
        <p-button type="button" label="Go back" icon="pi pi-chevron-left" class="action-btn" (click)="goBack()"></p-button>
      </div>
    </div>
  `,
  styleUrl: './deck-page-action-btn.component.scss'
})
export class DeckPageActionBtn {
  private readonly router = inject(Router)
  private readonly location = inject(Location);
  private readonly deckService = inject(DeckService);
  private readonly modalService = inject(GlobalModalWindowService<IEditDeck>)
  private readonly showToastService = inject(ShowToastService)
  @Input() public deckId!: string;

  public goBack() {
    this.location.back();
    this.deckService.getDecks().subscribe()
  };

  public study() {
    this.router.navigate([`/words-to-learn/deck/${this.deckId}/study`]);
  };

  public openEditDeckModal(): void {
    this.modalService.open(
      FormModalComponent,
      {
        title: 'Edit a deck',
        fields: this.getEditDeckModalWindowFields(),
        handleSave: (editDeckDto) => this.handleSave(editDeckDto),
        handleCancel: () => this.handleCancel(),
        handleDelete: () => this.handleDelete(),
      })
  }

  private handleSave(editDeckDto: IEditDeck) {
    this.deckService.editDeck(this.deckId, editDeckDto).subscribe({
      next: () => {
        this.modalService.close()
        this.showToastService.showToast('success', 'Success');
      },
      error: () => {
        this.showToastService.showToast('error', 'Server error');
      }
    })
  }

  private handleCancel() {
    this.modalService.close()
  }

  private handleDelete() {
    this.deckService.removeDeck(this.deckId).subscribe({
      next: () => {
        this.router.navigate([`/words-to-learn/`]);
        this.modalService.close()
        this.showToastService.showToast('success', 'Deleted');
      },
      error: () => {
        this.showToastService.showToast('error', 'Server error');
      }
    })
  }

  private getEditDeckModalWindowFields(): IModalField[] {
    const currentDeck = this.deckService.decks().find(deck => deck.id === this.deckId)
    return [
      { label: 'Deck name', value: 'name', initialValue: currentDeck?.name },
      { label: 'Description', value: 'description', initialValue: currentDeck?.description },
    ]
  }
}
