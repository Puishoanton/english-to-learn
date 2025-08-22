import { NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ICard } from '../../../models/words-to-learn';
import { Button } from "primeng/button";
import { IModalField } from '../../../models/modal-props.interface';
import { GlobalModalWindowService } from '../../../services/global-modal-window.service';
import { FormModalComponent } from '../modals/form-modal/form-modal.component';

@Component({
  selector: 'app-deck-card',
  imports: [CardModule, NgClass, Button],
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

  `,
  styleUrl: './deck-card.component.scss'
})
export class DeckCardComponent {
  private readonly modalService = inject(GlobalModalWindowService)
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
        handleSave: (formData: Record<string, string>) => this.handleSave(formData),
        handleCancel: () => this.handleCancel(),
        handleDelete: () => this.handleDelete(),
      })
  }

  private handleSave(formData: Record<string, string>) {
    console.log(formData);
    this.modalService.close()
  }

  private handleCancel() {
    this.modalService.close()
  }

  private handleDelete() {
    this.modalService.close()
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
