import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SafePipe } from '../../shared/pipes/safe.pipe';
import { ToastService } from '../../core/services/toast.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionHeadingComponent, RevealDirective, SafePipe],
  template: `
    <div class="page-shell section-container">
      <app-section-heading label="Get In Touch" title="Contact Me"
        description="Have a project in mind, a role to fill, or just want to say hi? My inbox is always open." />

      <div class="contact__grid">
        <!-- Channels -->
        <div class="contact__info">
          <div class="channel" appReveal>
            <div class="channel__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            </div>
            <div>
              <div class="channel__label">Email</div>
              <a class="channel__value" href="mailto:sureshm.852001@gmail.com">sureshm.852001@gmail.com</a>
            </div>
          </div>
          <div class="channel" appReveal [delay]="80">
            <div class="channel__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z"/></svg>
            </div>
            <div>
              <div class="channel__label">LinkedIn</div>
              <a class="channel__value" href="https://www.linkedin.com/in/sureshkumar-m-665981227/" target="_blank" rel="noopener">linkedin.com/in/sureshkumar-m-665981227</a>
            </div>
          </div>
          <div class="channel" appReveal [delay]="240">
            <div class="channel__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"></path></svg>
            </div>
            <div>
              <div class="channel__label">Phone</div>
              <a class="channel__value" href="tel:+919786271736">+91 97862 71736</a>
            </div>
          </div>
          <div class="channel" appReveal [delay]="160">
            <div class="channel__icon channel__icon--wa">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </div>
            <div>
              <div class="channel__label">WhatsApp</div>
              <a class="channel__value" href="https://wa.me/919786271736" target="_blank" rel="noopener">+91 97862 71736</a>
            </div>
          </div>
          <div class="contact__response" appReveal [delay]="300">
            <strong>Response time</strong>
            <p>I usually reply within 24 hours. For urgent matters, reach out via phone.</p>
          </div>
        </div>

        <!-- Form -->
        <form class="contact__form glass" [formGroup]="form" (ngSubmit)="onSubmit()" appReveal [delay]="120" novalidate>
          <div class="form__channel">
            <span class="form__channel-label">Send via</span>
            <div class="form__channel-options">
              <button type="button" [class.is-active]="channel() === 'whatsapp'" (click)="channel.set('whatsapp')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                WhatsApp
              </button>
              <button type="button" [class.is-active]="channel() === 'email'" (click)="channel.set('email')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                Email
              </button>
            </div>
          </div>
          <div class="form__row">
            <div class="form__field">
              <label for="name">Full Name *</label>
              <input id="name" type="text" formControlName="name" placeholder="John Doe" />
              <p class="form__error" *ngIf="form.get('name')?.touched && form.get('name')?.invalid">Please enter your name.</p>
            </div>
            <div class="form__field">
              <label for="email">Email *</label>
              <input id="email" type="email" formControlName="email" placeholder="john@example.com" />
              <p class="form__error" *ngIf="form.get('email')?.touched && form.get('email')?.invalid">Enter a valid email address.</p>
            </div>
          </div>

          <div class="form__row">
            <div class="form__field">
              <label for="phone">Phone</label>
              <input id="phone" type="tel" formControlName="phone" placeholder="+91 98765 43210" />
              <p class="form__error" *ngIf="form.get('phone')?.touched && form.get('phone')?.invalid">Enter a valid 10-digit Indian mobile number, e.g. 98765 43210.</p>
            </div>
            <div class="form__field">
              <label for="subject">Subject *</label>
              <input id="subject" type="text" formControlName="subject" placeholder="Project inquiry" />
              <p class="form__error" *ngIf="form.get('subject')?.touched && form.get('subject')?.invalid">Please add a subject.</p>
            </div>
          </div>

          <div class="form__field">
            <label for="message">Message *</label>
            <textarea id="message" rows="6" formControlName="message" placeholder="Tell me about your project..."></textarea>
            <p class="form__error" *ngIf="form.get('message')?.touched && form.get('message')?.invalid">Message must be at least 10 characters.</p>
          </div>

          <button type="submit" class="btn-gradient contact__submit" [disabled]="form.invalid || sending()">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
            {{ sending() ? 'Opening…' : (channel() === 'whatsapp' ? 'Send via WhatsApp' : 'Send via Email') }}
          </button>
        </form>
      </div>

      <!-- Map -->
      <div class="contact__map glass" appReveal>
        <iframe
          [src]="mapUrl | safe:'resourceUrl'"
          width="100%" height="380" style="border:0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          title="Location map" allowfullscreen></iframe>
      </div>
    </div>
  `,
  styles: `
    .contact__grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
    @media (min-width: 1024px) { .contact__grid { grid-template-columns: 0.9fr 1.1fr; } }

    .contact__info { display: flex; flex-direction: column; gap: 1.1rem; }
    .channel {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.15rem 1.25rem;
      border-radius: 1.1rem;
      background: var(--card);
      border: 1px solid var(--border);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .channel:hover { transform: translateX(6px); border-color: color-mix(in srgb, var(--primary) 40%, var(--border)); }
    .channel__icon {
      width: 46px;
      height: 46px;
      display: grid;
      place-items: center;
      border-radius: 13px;
      color: var(--primary);
      background: color-mix(in srgb, var(--primary) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
      flex-shrink: 0;
    }
    .channel__label { font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.2rem; }
    .channel__value { font-size: 0.94rem; font-weight: 600; word-break: break-word; }
    .channel__value:hover { color: var(--primary); }
    .channel__icon--wa { color: #25d366; background: color-mix(in srgb, #25d366 12%, transparent); border-color: color-mix(in srgb, #25d366 30%, transparent); }
    .contact__response { padding: 1.2rem 1.4rem; border-radius: 1.1rem; background: color-mix(in srgb, var(--primary) 7%, var(--card)); border: 1px solid color-mix(in srgb, var(--primary) 22%, var(--border)); }
    .contact__response strong { font-size: 0.92rem; }
    .contact__response p { color: var(--text-secondary); font-size: 0.88rem; line-height: 1.6; margin: 0.4rem 0 0; }

    .form__channel { display: flex; flex-direction: column; gap: 0.5rem; }
    .form__channel-label { font-size: 0.82rem; font-weight: 600; letter-spacing: 0.02em; }
    .form__channel-options { display: flex; gap: 0.6rem; flex-wrap: wrap; }
    .form__channel-options button {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.55rem 1rem;
      border-radius: 999px;
      font-family: var(--font-sans);
      font-size: 0.86rem;
      font-weight: 600;
      color: var(--text-secondary);
      background: var(--bg-soft);
      border: 1px solid var(--border);
      cursor: pointer;
      transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
    }
    .form__channel-options button:hover { border-color: var(--primary); }
    .form__channel-options button.is-active { color: #fff; background: var(--primary); border-color: var(--primary); }

    .contact__form { padding: 1.8rem; border-radius: 1.5rem; display: flex; flex-direction: column; gap: 1.2rem; }
    .form__row { display: grid; grid-template-columns: 1fr; gap: 1.2rem; }
    @media (min-width: 640px) { .form__row { grid-template-columns: 1fr 1fr; } }
    .form__field { display: flex; flex-direction: column; gap: 0.4rem; }
    .form__field label { font-size: 0.82rem; font-weight: 600; letter-spacing: 0.02em; }
    .form__field input, .form__field textarea {
      width: 100%;
      padding: 0.8rem 1rem;
      border-radius: 0.8rem;
      font-family: var(--font-sans);
      font-size: 0.94rem;
      color: var(--text-primary);
      background: var(--bg-soft);
      border: 1px solid var(--border);
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      resize: vertical;
    }
    .form__field input:focus, .form__field textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent);
    }
    .form__field input.ng-invalid.ng-touched, .form__field textarea.ng-invalid.ng-touched { border-color: var(--danger); }
    .form__error { margin: 0; font-size: 0.78rem; color: var(--danger); }
    .contact__submit { align-self: flex-start; }
    .contact__map { margin-top: 3rem; border-radius: 1.5rem; overflow: hidden; }
    .contact__map iframe { display: block; width: 100%; filter: grayscale(0.25) contrast(1.02); }
  `,
})
export class ContactComponent implements OnInit {
  readonly form: FormGroup;
  readonly sending = signal(false);
  readonly channel = signal<'whatsapp' | 'email'>('whatsapp');
  readonly mapUrl = 'https://maps.google.com/maps?q=Chennai%2C%20Tamil%20Nadu%2C%20India&t=&z=12&ie=UTF8&iwloc=&output=embed';

  private static readonly PHONE_PATTERN = /^(\+?91[\s-]?|0[\s-]?)?[6-9]\d{9}$/;
  private static readonly WHATSAPP_NUMBER = '919786271736';
  private static readonly EMAIL = 'sureshm.852001@gmail.com';

  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.form = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(ContactComponent.PHONE_PATTERN)]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.seo.update('Contact', 'Get in touch — let us build something great together.');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email, phone, subject, message } = this.form.value;
    const text = [
      `Hi Sureshkumar,`,
      '',
      message,
      '',
      `— ${name}`,
      email ? `   ${email}` : '',
      phone ? `   ${phone}` : '',
    ].filter(Boolean).join('\n');

    this.sending.set(true);
    if (this.channel() === 'email') {
      window.open(
        `mailto:${ContactComponent.EMAIL}?subject=${encodeURIComponent(`Portfolio: ${subject}`)}&body=${encodeURIComponent(text)}`,
        '_self'
      );
      this.toast.success('Opening your email app — just press send!', 'Email');
    } else {
      window.open(
        `https://wa.me/${ContactComponent.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
        '_blank'
      );
      this.toast.success('WhatsApp opened with your message — just press send!', 'WhatsApp');
    }
    this.form.reset();
    this.channel.set('whatsapp');
    this.sending.set(false);
  }
}


