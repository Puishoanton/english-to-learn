import { NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ICard, IEditCard } from '../../../models/words-to-learn';
import { Button } from "primeng/button";
import { IModalField } from '../../../models/modal-props.interface';
import { GlobalModalWindowService } from '../../../services/global-modal-window.service';
import { FormModalComponent } from '../modals/form-modal/form-modal.component';
import { ShowToastService } from '../../../services/show-toast.service';
import { CardService } from '../../../services/words-to-learn/card.service';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-deck-card',
  imports: [CardModule, NgClass, Button, Toast],
  exportAs: 'deckCard',
  template: `
    <p-card 
      class="flip-card"
      [ngClass]="{ 'translation': card.flipped }"
      (click)="toggleFlip(card)"
    >
     @if(card.flipped) {
       <ng-container >
          <h2>{{ card.translation }}</h2>
          <p>{{ card.translation_context }}</p>
       </ng-container>
     }@else {
       <ng-container>
         <h2>{{ card.word }}</h2>
         <p>{{ card.word_context }}</p>
       </ng-container>
     }
     <p-button icon="pi pi-pencil" class="edit-btn" (onClick)="openEditCardModal(); $event.stopPropagation()" />
    </p-card>
    <p-toast/>

  `,
  styleUrl: './deck-card.component.scss'
})
export class DeckCardComponent {
  private readonly modalService = inject(GlobalModalWindowService<IEditCard>)
  private readonly cardService = inject(CardService)
  private readonly showToastService = inject(ShowToastService)

  @Input({ required: true }) public card!: ICard & { flipped?: boolean };

  public toggleFlip(card: ICard & { flipped?: boolean }): void {
    card.flipped = !card.flipped;
  }

  public openEditCardModal(): void {
    if (!this.card) return
    this.modalService.open(
      FormModalComponent,
      {
        title: 'Edit card',
        fields: this.getEditCardModalWindowFields(),
        handleSave: (editCardDto) => this.handleSave(editCardDto),
        handleCancel: () => this.handleCancel(),
        handleDelete: () => this.handleDelete(),
      })
  }

  private handleSave(editCardDto: IEditCard) {
    const { status, message } = this.cardService.editCard(this.card.id, editCardDto)
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

  private handleDelete() {
    const { status, message } = this.cardService.deleteCard(this.card.id)
    if (status === 200) {
      this.modalService.close()
      this.showToastService.showToast('success', message);
      return
    }
    this.showToastService.showToast('error', message);
  }

  private getEditCardModalWindowFields(): IModalField[] {
    return [
      { label: 'Word', value: 'word', initialValue: this.card.word },
      { label: 'Word Context', value: 'word_context', initialValue: this.card.word_context },
      { label: 'Translation', value: 'translation', initialValue: this.card.translation },
      { label: 'Translation context', value: 'translation_context', initialValue: this.card.translation_context }
    ]
  }
}
