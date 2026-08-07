import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

/**
 * Cycling typewriter animation.
 * Input phrases are typed character by character, paused, erased and repeated.
 */
@Component({
  selector: 'app-typing-text',
  standalone: true,
  template: `<span class="type"><span class="type__text" #text></span><span class="typing-caret"></span></span>`,
})
export class TypingTextComponent implements OnInit, OnDestroy {
  @Input() phrases: string[] = ['Java Full Stack Developer'];
  @Input() typeSpeed = 70;
  @Input() deleteSpeed = 40;
  @Input() holdDelay = 1600;

  @ViewChild('text', { static: true }) private textRef!: ElementRef<HTMLElement>;

  private index = 0;
  private charIndex = 0;
  private deleting = false;
  private timer?: ReturnType<typeof setTimeout>;
  private element?: HTMLElement;

  ngOnInit(): void {
    this.element = this.textRef.nativeElement;
    void this.loop();
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private async loop(): Promise<void> {
    const phrase = this.phrases[this.index] ?? '';

    if (this.deleting) {
      this.charIndex = Math.max(0, this.charIndex - 1);
    } else {
      this.charIndex++;
    }

    this.render(phrase.substring(0, this.charIndex));

    let delay = this.deleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.deleting && this.charIndex === phrase.length) {
      delay = this.holdDelay;
      this.deleting = true;
    } else if (this.deleting && this.charIndex === 0) {
      this.deleting = false;
      this.index = (this.index + 1) % this.phrases.length;
      delay = 400;
    }

    this.timer = setTimeout(() => void this.loop(), delay);
  }

  private render(text: string): void {
    if (this.element) this.element.textContent = text;
  }
}
