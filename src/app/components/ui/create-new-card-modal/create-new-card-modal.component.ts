import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ICreateCard } from '../../../models/words-to-learn';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { EMPTY_CARD } from '../../../constants/initial-create-card.const';



@Component({
  selector: 'app-create-new-card-modal',
  imports: [ButtonModule, DialogModule, FormsModule, NgClass],
  exportAs: 'createNewCardModal',
  template: `
    <p-dialog class="create-card-dialog" [closable]="false" [modal]="true" [(visible)]="visible" (onHide)="close.emit()">
      <span class="modal-title">Create a new card to learn</span>
      <div class="create-card-form">
        <div class="form-group">
          <label class="form-label"for="word">Word</label>
          <input [ngClass]="{'invalid-input': submitted && !newCard.word}" class="form-input" pInputText id="word" autocomplete="off" [(ngModel)]="newCard.word" />
        </div>
        <div class="form-group">
          <label class="form-label"for="word_context">Word context</label>
          <input [ngClass]="{'invalid-input': submitted && !newCard.word_context}" class="form-input" pInputText id="word_context" autocomplete="off" [(ngModel)]="newCard.word_context"/>
        </div>
        <div class="form-group">
          <label class="form-label" for="translate">Translation</label>
          <input [ngClass]="{'invalid-input': submitted && !newCard.translation}" class="form-input" pInputText id="translation" autocomplete="off" [(ngModel)]="newCard.translation"/>
        </div>
        <div class="form-group">
          <label [ngClass]="{'invalid-input': submitted && !newCard.translation_context}" class="form-label" for="translate_context">Translation context</label>
          <input class="form-input" pInputText id="translation_context" autocomplete="off" [(ngModel)]="newCard.translation_context"/>
        </div>
        <div class="form-actions">
          <p-button class="btn-cancel" label="Cancel" severity="secondary" (click)="onCancel()" />
          <p-button class="btn-save" label="Save" (click)="onSave()" />
        </div>
      </div>
    </p-dialog>
  `,
  styleUrl: './create-new-card-modal.component.scss'
})
export class CreateNewCardModalComponent {
  @Input({ required: true }) deckId!: string;
  @Input({ required: true }) visible!: boolean;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ICreateCard>();

  public newCard: ICreateCard = { ...EMPTY_CARD }
  public submitted: boolean = false;
  private get isFormValid(): boolean {
    return !!(
      this.deckId &&
      this.newCard.word &&
      this.newCard.word_context &&
      this.newCard.translation &&
      this.newCard.translation_context
    );
  }

  public onSave(): void {
    this.submitted = true;
    this.newCard.deckId = this.deckId;
    if (this.isFormValid) {
      this.save.emit(this.newCard)
      this.resetForm()
    }
  }
  public onCancel(): void {
    this.resetForm();
    this.close.emit()
  }

  private resetForm(): void {
    this.newCard = { ...EMPTY_CARD, deckId: this.deckId };
    this.submitted = false;
  }
}
