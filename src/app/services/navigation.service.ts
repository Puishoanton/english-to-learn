import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
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

    if (label) {
      return label
    }
    return 'English to learn'
  }
}
