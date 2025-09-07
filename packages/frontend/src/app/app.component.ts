import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SeoService } from './services/seo.service';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ISeoMetaTags } from './models/seo-meta-tags.interface';
import { GlobalModalWindowComponent } from './components/ui/modals/global-modal-window/global-modal-window.component';
import { AuthService } from './services/auth.service';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalModalWindowComponent, Toast],
  template: `
    <router-outlet></router-outlet>
    <app-global-modal-window></app-global-modal-window>
    <p-toast/>
  `
  ,
})
export class AppComponent implements OnInit {
  protected readonly title = signal('english-to-learn');
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private readonly authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  public ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        let root = this.route.root;
        while (root.firstChild) {
          root = root.firstChild
        }
        const { title, description } = root.snapshot.data as ISeoMetaTags
        if (title && description) {
          this.seoService.updateMetaTags(title, description)
        }
      })
    this.authService.getMe().subscribe();
  }
}
