import { Pipe, PipeTransform } from '@angular/core';

/**
 * Human friendly relative timestamp, e.g. "3 days ago".
 */
@Pipe({ name: 'timeAgo', standalone: true })
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';
    const date = typeof value === 'string' ? new Date(value) : value;
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    const units: Array<[number, string]> = [
      [60, 'second'],
      [60, 'minute'],
      [24, 'hour'],
      [7, 'day'],
      [4.35, 'week'],
      [12, 'month'],
      [Number.POSITIVE_INFINITY, 'year'],
    ];

    let interval = seconds;
    let unit = 'second';
    for (const [divisor, name] of units) {
      if (interval < divisor) {
        unit = name;
        break;
      }
      interval /= divisor;
    }
    const rounded = Math.max(1, Math.round(interval));
    return `${rounded} ${unit}${rounded > 1 ? 's' : ''} ago`;
  }
}
