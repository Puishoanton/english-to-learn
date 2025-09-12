import { Component, inject } from '@angular/core';
import { GoogleLoginComponent } from "../../components/ui/google-login/google-login.component";
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-welcome-page',
  imports: [GoogleLoginComponent, ProgressSpinnerModule],
  template: `
  @if(loaderService.isLoading()) {
    <div class="spinner">
      <p-progressSpinner 
        strokeWidth="4"
        animationDuration=".7s"
      />
    </div>
  }
  @else{<div class="welcome-container">
    <div class="text">
      @if(!authService.isLoggedIn()) {
        <span>We are glad to have you here.</span>
        <span class="small">To start using the app and explore all features, please log in or create an account.</span>
      }@else {
        <span>Yo are logged in and ready to explore your decks.</span>
        <span class="small"> Let’s get started!</span>
      }
    </div>
    @if(!authService.isLoggedIn()) {
      <app-google-login size="large"></app-google-login>
    }
  </div>}
  `,
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
  public readonly authService = inject(AuthService)
  public readonly loaderService = inject(LoaderService)
}
