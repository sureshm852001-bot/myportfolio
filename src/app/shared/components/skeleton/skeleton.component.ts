import { Component, Input } from '@angular/core';

/**
 * Shimmering skeleton block for content placeholders.
 */
@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div class="skeleton" [class]="className" [style.width]="width" [style.height]="height"
         [style.border-radius]="radius"></div>
  `,
})
export class SkeletonComponent {
  @Input() className = '';
  @Input() width = '100%';
  @Input() height = '1rem';
  @Input() radius = '0.75rem';
}
