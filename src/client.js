import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider, initI18n } from '@wix/wix-i18n-config';
import axios from 'axios';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import App from './components/App';
import { create as createFedopsLogger } from '@wix/fedops-logger';

const baseURL = window.__BASEURL__;

wixAxiosConfig(axios, { baseURL });

const fedopsLogger = createFedopsLogger('ambassador-workshop');

const i18n = initI18n({
  locale: window.__LOCALE__,
  messages: window.__MESSAGES__,
});

// Move the following `appLoaded()` call to the point where your app has fully loaded.
// See https://github.com/wix-private/fed-infra/blob/master/fedops/fedops-logger/README.md
fedopsLogger.appLoaded();

ReactDOM.render(
  <Suspense fallback={'...loading'}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Suspense>,
  document.getElementById('root'),
);
