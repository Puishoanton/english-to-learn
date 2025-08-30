import { NgClass } from '@angular/common';
import { NavigationService } from '../../../services/navigation.service';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { filter, Subscription } from 'rxjs';
import { TabsModule } from 'primeng/tabs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';
import { GoogleJwtPayload } from '../../../models/google/google-jwt-payload.interface';
import { GoogleCredentialResponse } from '../../../models/google/google-credential-response.interface';

declare const google: any;
@Component({
  selector: 'app-sidebar',
  imports: [ButtonModule, NgClass, TabsModule, RouterModule],
  template: `
    <div class="sidebar" [ngClass]="{'sidebar-closed': isClosed}">
     <p-button styleClass="p-button-sidebar-toggle" (onClick)="toggleSidebar()" [icon]="isClosed ? 'pi pi-chevron-left': 'pi pi-chevron-right'" ></p-button>
     <p-tabs>
      <p-tablist class="sidebar-nav-list">
         @for (menuItem of menuItems; track menuItem.routerLink) {
          <p-tab [value]="menuItem.routerLink" [routerLink]="menuItem.routerLink" [ngClass]="{'active-route': currentUrl === menuItem.routerLink}">
           <i [class]="menuItem.icon"></i>
           <span>{{menuItem.label}}</span>
          </p-tab>}
      </p-tablist>
     </p-tabs>
     <div id="google-btn"></div>
    </div>
  `,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  public isClosed = true
  public currentUrl: string = ""
  public menuItems: MenuItem[] = []
  private routerSubscription: Subscription | null = null;
  private destroyRef = inject(DestroyRef)
  private readonly navigationService = inject(NavigationService)
  private readonly router = inject(Router)
  private readonly userService = inject(UserService)

  public ngOnInit(): void {
    this.menuItems = this.navigationService.getSidebarNavigationItems()
    this.currentUrl = this.router.url
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.urlAfterRedirects
        }
      })

    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: this.handleCredentialResponse.bind(this),
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      {
        type: "standart",
        theme: "filled_black",
        size: "medium",
        text: "signin",
        shape: "pill",
      }
    );
  }

  public toggleSidebar() {
    this.isClosed = !this.isClosed
  }

  public handleCredentialResponse(response: GoogleCredentialResponse) {
    const { email } = this.decodeJwt(response.credential);

    this.userService.googleLogin({
      tokenId: response.credential,
      email
    })
  }

  private decodeJwt(token: string): GoogleJwtPayload {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
}
