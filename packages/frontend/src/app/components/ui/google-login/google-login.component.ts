import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { GoogleCredentialResponse } from '../../../models/google/google-credential-response.interface';
import { AuthService } from '../../../services/auth.service';
import { ShowToastService } from '../../../services/show-toast.service';
import { IAuthResponse } from '../../../models/auth/auth-response.interface';

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
  private readonly showToastService = inject(ShowToastService)

  @ViewChild('googleBtn', { static: true }) public googleBtn!: ElementRef<HTMLDivElement>;
  @Input({ required: false }) public size?: string = "medium"
  public ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: GoogleCredentialResponse) => {
        this.authService.googleLogin({
          tokenId: response.credential,
        }).subscribe({
          next: ({message}) => { 
            this.showToastService.showToast('success', message);
          },
          error: () => { 
            this.showToastService.showToast('error', 'Server error');
          }
        });
      }
    })


    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      {
        type: "standard",
        theme: "filled_black",
        size: this.size,
        text: "signin",
        shape: "pill",
      }
    );
  }
}
