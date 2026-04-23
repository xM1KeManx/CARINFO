import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular({ mode: 'md' }),
    provideHttpClient(),
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__carinfodb',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
      })
    ),
  ],
};