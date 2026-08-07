import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
import { ParticleBackgroundComponent } from './shared/components/particle-background/particle-background.component';
import { MouseGlowComponent } from './shared/components/mouse-glow/mouse-glow.component';
import { AnimatedCursorComponent } from './shared/components/animated-cursor/animated-cursor.component';
import { ScrollProgressComponent } from './shared/components/scroll-progress/scroll-progress.component';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top.component';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    LoadingScreenComponent,
    ParticleBackgroundComponent,
    MouseGlowComponent,
    AnimatedCursorComponent,
    ScrollProgressComponent,
    BackToTopComponent,
    ToastContainerComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);

  private routeSubscription?: Subscription;

  ngOnInit(): void {
    this.routeSubscription = this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.router.routerState.root.firstChild;
        const data = route?.snapshot.data as { title?: string; description?: string } | undefined;
        this.seo.update(data?.title ?? '', data?.description);
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
