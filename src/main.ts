import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  if ('serviceWorker' in navigator) {
    //navigator.serviceWorker.register('/service-worker.js').then(() => console.log('service worker registered sucessfully'));
    navigator.serviceWorker.register('/workbox-sw.js').then(() => console.log('service worker registered sucessfully'));
  }
})
  .catch(err => console.error(err));
