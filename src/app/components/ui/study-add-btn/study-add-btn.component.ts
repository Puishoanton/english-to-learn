import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-study-add-btn',
  imports: [ButtonModule],
  exportAs: 'studyAddBtn',
  template: `
    <div class="study-add-new">
      <p-button type="button" label="Study words" icon="pi pi-book" class="study-add-button" (click)="study()"></p-button>
      <p-button type="button" label="Add New" icon="pi pi-plus" class="study-add-button" (click)="addNew()"></p-button>
    </div>
  `,
  styleUrl: './study-add-btn.component.scss'
})
export class StudyAddBtnComponent {
  private readonly router = inject(Router)
  @Input() public deckId!: string;

  public addNew() {
    console.log('add new clicked');
  };

  public study() {
    this.router.navigate([`/words-to-learn/deck/${this.deckId}/study`]);
  };
}
