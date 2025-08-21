import { Component, inject, Input, OnInit } from '@angular/core';
import { IModalField } from '../../../models/modal-fields.interface';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { GlobalModalWindowService } from '../../../services/global-modal-window.service';

@Component({
  selector: 'app-edit-card-modal',
  imports: [ButtonModule, FormsModule, NgClass],
  exportAs: 'editCardModal',
  template: `
    <span class="modal-title">{{title}}</span>
    <div class="modal-form">
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
        <p-button class="btn-cancel" label="Cancel" severity="secondary" (click)="onCancel()" />
        <p-button class="btn-save" label="Save" (click)="onSave()" />
      </div>
    </div>
  `,
  styleUrl: './edit-card-modal.component.scss'
})
export class EditCardModalComponent implements OnInit {
  private readonly modalService = inject(GlobalModalWindowService)
  public fields!: IModalField[];
  public title!: string;
  public submitted: boolean = false;
  public formData: Record<string, string> = {};

  public ngOnInit(): void {
    this.initFormData()
  }

  public onSave() {
    this.submitted = true;
    const isValid = this.fields.every(field => !!this.formData[field.value]);
    if (!isValid) {
      return;
    }
    this.modalService.close()
  }

  public onCancel() {
    this.modalService.close()
  }

  private initFormData(): void {
    this.formData = {};
    if (this.fields) {
      this.fields.forEach(field => this.formData[field.value] = field.initialValue ?? '');
    }
    this.submitted = false;
  }
}
