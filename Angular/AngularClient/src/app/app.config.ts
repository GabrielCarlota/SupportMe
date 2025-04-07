import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations'
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MyPreset } from './assets/themes/mytheme'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),provideAnimationsAsync(), provideAnimations(),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
               preset: MyPreset,
               options:{
                
               }
            }
        })
    ]
};
