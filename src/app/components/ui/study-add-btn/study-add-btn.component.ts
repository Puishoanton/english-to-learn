import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-study-add-btn',
  imports: [ButtonModule],
  template: `
  <div class="study-add-new">
    <p-button type="button" label="Study cards" icon="pi pi-book" class="study-add-button" (click)="study()"></p-button>
    <p-button type="button" label="Add New" icon="pi pi-plus" class="study-add-button" (click)="addNew()"></p-button>
  </div>
  `,
  styleUrl: './study-add-btn.component.scss'
})
export class StudyAddBtnComponent {
  @Input() public addNew: () => void = () => { };
  @Input() public study: () => void = () => { };
}
