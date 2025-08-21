import { Component, DestroyRef, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { GlobalModalWindowService } from '../../../services/global-modal-window.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-global-modal-window',
  imports: [DialogModule],
  exportAs: 'globalModalWindow',
  template: `
    <p-dialog class="modal-dialog" [closable]="false" [modal]="true" [(visible)]="visible" (onHide)="close()">
      <ng-container #modalContainer></ng-container>
    </p-dialog>
  `,
  styleUrl: './global-modal-window.component.scss'
})
export class GlobalModalWindowComponent implements OnInit {
  private readonly modalService = inject(GlobalModalWindowService)
  private readonly destroyRef = inject(DestroyRef);
  @ViewChild('modalContainer', { read: ViewContainerRef }) container!: ViewContainerRef
  public visible: boolean = false

  public ngOnInit() {
    this.modalService.modalState$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(state => {
        this.visible = state.visible

        if (state.component && state.visible) {
          this.container.clear()
          const componentRef = this.container.createComponent(state.component);

          if (state.data) {
            Object.assign(componentRef.instance, state.data);
          }
        }
      })
  }

  public close() {
    this.modalService.close()
  }
}
