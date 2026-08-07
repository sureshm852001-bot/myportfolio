import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

/**
 * Marks a URL / HTML as safe to render (for iframes, PDFs, embeds).
 * Use only with trusted content.
 */
@Pipe({ name: 'safe', standalone: true })
export class SafePipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined, type: 'url' | 'resourceUrl' | 'html' = 'url'): SafeUrl | SafeResourceUrl | SafeHtml | string {
    if (!value) return '';
    switch (type) {
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
  }
}
