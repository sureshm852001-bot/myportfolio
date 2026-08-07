import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  update(title: string, description?: string): void {
    this.title.setTitle(
      title ? `${title} | Sureshkumar M — Java Full Stack Developer` : 'Sureshkumar M | Java Full Stack Developer'
    );
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    }
    this.meta.updateTag({ property: 'og:title', content: this.title.getTitle() });
  }
}
