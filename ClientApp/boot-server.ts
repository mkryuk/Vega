import 'angular2-universal-polyfills';
// tslint:disable-next-line:ordered-imports
import 'angular2-universal-patch';
import 'zone.js';

import { enableProdMode } from '@angular/core';
import { platformNodeDynamic } from 'angular2-universal';
import {createServerRenderer, RenderResult,  RenderToStringResult} from 'aspnet-prerendering';
import { AppModule } from './app/app.module';

enableProdMode();
const platform = platformNodeDynamic();
export default createServerRenderer((params) => {

  return new Promise<RenderResult>((resolve, reject) => {
    const requestZone = Zone.current.fork({
      name: 'angular-universal request',
      onHandleError: (parentZone, currentZone, targetZone, error) => {
        // If any error occurs while rendering the module, reject the whole operation
        reject(error);
        return true;
      },
      properties: {
        baseUrl: '/',
        document: '<app></app>',
        originUrl: params.origin,
        preboot: false,
        requestUrl: params.url,
      },
    });

    return requestZone.run<Promise<string>>(() => platform.serializeModule(AppModule)).then((html) => {
      // tslint:disable-next-line:no-object-literal-type-assertion
      resolve({ html } as RenderToStringResult);
    }, reject);
  });
});
