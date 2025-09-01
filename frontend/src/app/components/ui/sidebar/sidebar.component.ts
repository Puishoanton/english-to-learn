import { CommonModule, NgClass } from '@angular/common';
import { NavigationService } from '../../../services/navigation.service';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { filter, Subscription } from 'rxjs';
import { TabsModule } from 'primeng/tabs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../services/auth.service';
import { GoogleLoginComponent } from "../google-login/google-login.component";

@Component({
  selector: 'app-sidebar',
  imports: [ButtonModule, NgClass, TabsModule, RouterModule, CommonModule, GoogleLoginComponent],
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
     @if(authService.isLoggedIn() !== undefined) {
      @if(authService.isLoggedIn()) {
        <button class="logout" (click)="logoutHandler()" >
          <i class="pi pi-sign-out" pButtonIcon></i>
          <span>Logout</span>
         </button>
       } @else if(currentUrl !== '/') {
        <app-google-login></app-google-login>
      }
     }
    </div>
  `,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  private readonly navigationService = inject(NavigationService)
  private readonly router = inject(Router)
  public readonly authService = inject(AuthService)
  private destroyRef = inject(DestroyRef)
  public isClosed = true
  public currentUrl: string = ""
  public menuItems: MenuItem[] = []

  public ngOnInit(): void {
    this.menuItems = this.navigationService.getSidebarNavigationItems()
    this.currentUrl = this.router.url

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.urlAfterRedirects
        }
      })

  }

  public toggleSidebar() {
    this.isClosed = !this.isClosed
  }

  public logoutHandler() {
    this.authService.logout().subscribe();
  }
}
