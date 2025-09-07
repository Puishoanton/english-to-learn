import { inject, Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DeckService } from './words-to-learn/deck.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly deckService = inject(DeckService)

  private readonly menuItems: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Words to learn', icon: 'pi pi-book', routerLink: '/words-to-learn' },
    { label: 'Grammer to learn', icon: 'pi pi-question-circle', routerLink: '/grammer-to-learn' }
  ];
  public getSidebarNavigationItems(): MenuItem[] {
    return this.menuItems
  }
  public getLabelByEndpoint(endpoint: string): string {
    const label = this.menuItems.find(item => item.routerLink === endpoint && endpoint !== '/')?.label
    const deckId = this.getDeckId(endpoint)

    if (deckId) {
      return this.deckService.decks().find(deck => deck.id === deckId)?.name ?? 'English to learn'
    }

    if (label) {
      return label
    }
    return 'English to learn'
  }
  private getDeckId(endpoint: string): string | null {
    const regex = /^\/words-to-learn\/deck\/([0-9a-fA-F-]+)(?:\/study)?$/;
    const match = endpoint.match(regex);
    return match ? match[1] : null;
  }
}
