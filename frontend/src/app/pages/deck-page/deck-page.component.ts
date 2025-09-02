import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/words-to-learn/card.service';
import { ICard, ICreateCard } from '../../models/words-to-learn';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { DeckPageActionBtn } from "../../components/ui/deck-page-action-btn/deck-page-action-btn.component";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IModalField } from '../../models/modal-props.interface';
import { DeckCardComponent } from '../../components/ui/deck-card/deck-card.component';
import { GlobalModalWindowService } from '../../services/global-modal-window.service';
import { FormModalComponent } from '../../components/ui/modals/form-modal/form-modal.component';
import { ShowToastService } from '../../services/show-toast.service';

@Component({
  selector: 'app-deck-page',
  imports: [CardModule, DeckPageActionBtn, ButtonModule, DialogModule, DeckCardComponent, DeckPageActionBtn],
  template: `
   <app-deck-page-action-btn [deckId]="deckId"></app-deck-page-action-btn>
   <div class="card-grid">
    @for (card of cardService.cards(); track card.id) {
      <app-deck-card [card]="card" [deckId]="deckId"></app-deck-card>
    }
    <p-card class="add-card" (click)="openCreateCardModal()">
      <i class="pi pi-plus"></i>
    </p-card>
   </div>
  `,
  styleUrl: './deck-page.component.scss'
})
export class DeckPageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  public readonly cardService = inject(CardService);
  private readonly modalService = inject(GlobalModalWindowService<ICreateCard>)
  private readonly showToastService = inject(ShowToastService)

  public deckId!: string;

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.deckId = params.get('id') ?? '';
      })
    this.cardService.getCards(this.deckId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  public openCreateCardModal(): void {
    this.modalService.open(
      FormModalComponent,
      {
        title: 'Create a new card',
        fields: this.getCreateCardModalWindowFields(),
        handleSave: (createCardDto) => this.handleSave(createCardDto),
        handleCancel: () => this.handleCancel()
      })
  }

  private handleSave(createCardDto: ICreateCard) {
    this.cardService.createCard(createCardDto, this.deckId).subscribe({
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

  private getCreateCardModalWindowFields(): IModalField[] {
    return [
      { label: 'Word', value: 'word' },
      { label: 'Word Context', value: 'word_context' },
      { label: 'Translation', value: 'translation' },
      { label: 'Translation context', value: 'translation_context' }
    ]
  }
}
