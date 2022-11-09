import ReactDOM from 'react-dom';
import { BrowserRouter, createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom';

import App from '@/App';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import './styles/tailwind.css';
import React from 'react';

Sentry.init({
  dsn: 'https://f9b78d8c10764484a2ea88ab3110cbd6@o4504127925780480.ingest.sentry.io/4504127929712640',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      )
    })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
