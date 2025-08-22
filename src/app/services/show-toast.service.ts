import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ShowToastService {
  private readonly messageService = inject(MessageService)

  public showToast(severity: 'success' | 'error', detail: string) {
    const styleClass = severity === 'success' ? 'success-toast toast' : 'error-toast toast';
    this.messageService.add({
      severity,
      summary: severity === 'success' ? 'Success' : 'Error',
      detail,
      life: 3000,
      styleClass,
      closable: true,
    });
  }
}
