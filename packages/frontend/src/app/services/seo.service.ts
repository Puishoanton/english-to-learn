import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly meta = inject(Meta)
  private readonly title = inject(Title)

  public updateMetaTags(title: string, description: string): void {
    this.title.setTitle(title)
    this.meta.updateTag({ name: 'description', content: description })
    this.meta.updateTag({ name: 'og:title', content: title })
    this.meta.updateTag({ name: 'og:description', content: description })
  }
}
