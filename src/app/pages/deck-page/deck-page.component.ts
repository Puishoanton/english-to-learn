import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/words-to-learn/card.service';
import { ICard, ICreateCard } from '../../models/words-to-learn';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { StudyAddBtnComponent } from "../../components/ui/study-add-btn/study-add-btn.component";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IModalField } from '../../models/modal-fields.interface';
import { DeckCardComponent } from '../../components/ui/deck-card/deck-card.component';
import { GlobalModalWindowService } from '../../services/global-modal-window.service';
import { FormModalComponent } from '../../components/ui/modals/form-modal/form-modal.component';

@Component({
  selector: 'app-deck-page',
  imports: [CardModule, StudyAddBtnComponent, ButtonModule, DialogModule, DeckCardComponent],
  template: `
   <app-study-add-btn [deckId]="deckId"></app-study-add-btn>
   <div class="card-grid">
    @for (card of cards; track card.id) {
      <app-deck-card [card]="card"></app-deck-card>
    }
    <p-card class="add-card" (click)="openEditCardModal()">create new card</p-card>
   </div>
  `,
  styleUrl: './deck-page.component.scss'
})
export class DeckPageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly cardService = inject(CardService);
  private readonly modalService = inject(GlobalModalWindowService)

  public deckId!: string;
  public cards: (ICard & { flipped?: boolean })[] = [];

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.deckId = params.get('id') ?? '';
        this.cards = this.cardService.getCards(this.deckId);
      })
  }

  public openEditCardModal(): void {
    this.modalService.open(
      FormModalComponent,
      {
        title: 'Create a new card',
        fields: this.getCreateCardModalWindowFields(),
        handleSave: (formData: Record<string, string>) => this.handleSave(formData),
        handleCancel: () => this.handleCancel()
      })
  }


  private handleSave(formData: Record<string, string>) {
    console.log(formData);
    this.modalService.close()
  }

  private handleCancel() {
    this.modalService.close()
  }

  private getCreateCardModalWindowFields(): IModalField[] {
    return [
      { label: 'Word', value: 'word' },
      { label: 'Word Context', value: 'word_context' },
      { label: 'Translation', value: 'translation' },
      { label: 'Translation context', value: 'translation_context' }
    ]
  }
}
