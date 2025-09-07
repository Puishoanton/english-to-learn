import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../ui/sidebar/sidebar.component";
import { NavigationService } from '../../services/navigation.service';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent, RouterLink],
  template: `
      <div class="layout-container">
        <app-sidebar></app-sidebar>
        <div class="main-wrapper">
          <div class="header">
            <h1 routerLink="/">{{header}}</h1>
          </div>
          <router-outlet></router-outlet>
        </div>
      </div>
  `,
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  public header: string = 'English to learn'
  private destroyRef = inject(DestroyRef)
  private readonly navigationService = inject(NavigationService)
  private readonly router = inject(Router)

  public ngOnInit(): void {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.header = this.navigationService.getLabelByEndpoint(this.router.url)
      })
  }

}
