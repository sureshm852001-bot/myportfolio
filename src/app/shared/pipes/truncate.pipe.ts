import { Pipe, PipeTransform } from '@angular/core';

/**
 * Truncates a string to a maximum number of characters with an ellipsis.
 */
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength = 80, suffix = '...'): string {
    if (!value) return '';
    if (value.length <= maxLength) return value;
    return value.substring(0, maxLength - suffix.length).trimEnd() + suffix;
  }
}
