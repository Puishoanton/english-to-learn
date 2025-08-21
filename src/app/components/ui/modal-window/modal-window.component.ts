import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-modal-window',
  imports: [ButtonModule, DialogModule, FormsModule, NgClass],
  exportAs: 'modalWindow',
  template: `
    <p-dialog class="modal-dialog" [closable]="false" [modal]="true" [(visible)]="visible" (onHide)="close.emit()">
      <span class="modal-title">{{title}}</span>
      <div class="modal-form">
        @for(field of fields; track field) {
          <div class="form-group">
            <label class="form-label" [for]="field">{{field.charAt(0).toUpperCase()+field.slice(1, field.length)}}</label>
            <input
              [ngClass]="{'invalid-input': submitted && !formData[field]}"
              class="form-input"
              pInputText [id]="field"
              autocomplete="off"
              [(ngModel)]="formData[field]"
            />
          </div>
        }
        <div class="form-actions">
          <p-button class="btn-cancel" label="Cancel" severity="secondary" (click)="onCancel()" />
          <p-button class="btn-save" label="Save" (click)="onSave()" />
        </div>
      </div>
    </p-dialog>
  `,
  styleUrl: './modal-window.component.scss'
})
export class ModalWindowComponent {
  @Input({ required: true }) public fields!: string[];
  @Input({ required: true }) public visible!: boolean;
  @Input({ required: true }) public title!: string;
  @Output() public close = new EventEmitter<void>();
  @Output() public save = new EventEmitter();

  public submitted: boolean = false;
  public formData: Record<string, string> = {};

  public ngOnChanges(): void {
    if (this.visible) {
      this.formData = {};
      this.fields.forEach(field => this.formData[field] = '');
      this.submitted = false;
    }
  }

  public onSave(): void {
    this.submitted = true;
    const isValid = this.fields.every(field => !!this.formData[field]);
    if (isValid) {
      this.save.emit({ ...this.formData });
      this.resetForm();
    }
  }

  public onCancel(): void {
    this.resetForm();
    this.close.emit();
  }

  private resetForm(): void {
    this.submitted = false;
    this.formData = {};
    this.fields.forEach(field => this.formData[field] = '');
  }
}
