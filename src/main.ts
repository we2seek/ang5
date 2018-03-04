import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'hammerjs';

if (process.env.NODE_ENV === 'production') {
  console.log('*** PRODUCTION MODE ***');
  enableProdMode();
} else {
  console.log('*** DEVELOPMENT MODE ***');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
