import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { GoogleCredentialResponse } from '../../../models/google/google-credential-response.interface';

declare const google: any;

@Component({
  selector: 'app-google-login',
  imports: [],
  exportAs: 'googleLogin',
  template: `<div #googleBtn></div>`,
  styleUrl: './google-login.component.scss'
})
export class GoogleLoginComponent implements AfterViewInit {
  private readonly authService = inject(AuthService)

  @ViewChild('googleBtn', { static: true }) public googleBtn!: ElementRef<HTMLDivElement>;

  public ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: GoogleCredentialResponse) => {
        this.authService.googleLogin({
          tokenId: response.credential,
        }).subscribe();
      }
    })


    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      {
        type: "standard",
        theme: "filled_black",
        size: "medium",
        text: "signin",
        shape: "pill",
      }
    );
  }
}
