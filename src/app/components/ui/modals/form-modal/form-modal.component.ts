import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IModalField } from '../../../../models/modal-fields.interface';

@Component({
  selector: 'app-form-modal',
  imports: [ButtonModule, DialogModule, FormsModule, NgClass],
  exportAs: 'formModal',
  template: `
    <div class="form-modal-title-cancel">
      <span class="form-modal-title">{{title}}</span>
      <p-button class="btn-cancel pi pi-times"  severity="secondary" (click)="onCancel()" />
   </div>
    <div class="form-modal-container">
      @for(field of fields; track field.value) {
      <div class="form-group">
        <label class="form-label" [for]="field">{{field.label}}</label>
        <input
          [ngClass]="{'invalid-input': submitted && !formData[field.value]}"
          class="form-input"
          pInputText [id]="field"
          autocomplete="off"
          [(ngModel)]="formData[field.value]"
        />
      </div>
      }
      <div class="form-actions">
        @if(handleDelete) {
          <p-button class="btn-delete action-btn" label="Delete a card" (click)="onDelete()" />
        }
        <p-button class="btn-save action-btn" label="Save" (click)="onSave()" />
      </div>
    </div>
  `,
  styleUrl: './form-modal.component.scss'
})
export class FormModalComponent {
  @Input({ required: true }) public handleSave!: (formData: Record<string, string>) => void;
  @Input({ required: false }) public handleDelete?: () => void;
  @Input({ required: true }) public handleCancel!: () => void;
  @Input({ required: true }) public fields!: IModalField[];
  @Input({ required: true }) public title!: string;
  public submitted: boolean = false;
  public formData: Record<string, string> = {};

  public ngOnInit(): void {
    this.initFormData()
  }

  public onSave() {
    this.submitted = true;
    const isValid = this.fields.every(field => !!this.formData[field.value]);

    if (isValid) {
      this.handleSave(this.formData)
    }
  }

  public onCancel() {
    this.handleCancel()
  }

  public onDelete() {
    if (this.handleDelete) {
      this.handleDelete()
    }
  }

  private initFormData(): void {
    this.formData = {};
    if (this.fields) {
      this.fields.forEach(field => this.formData[field.value] = field.initialValue ?? '');
    }
    this.submitted = false;
  }
}
