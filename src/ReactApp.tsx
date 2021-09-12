import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import ErrorBoundary from '@components/ErrorBoundary/index';
import IndexPage from '@/layout/index';
import './styles/index.less';

const history = createHashHistory();

// Sentry.init({ dsn: 'https://11f12914dc114782b37d9d94c8839a40@o414598.ingest.sentry.io/5304319' });

export default class App extends React.Component {
  render() {
    return (
      <>
      react
        <Router history={history}>
          <Switch>
            <ErrorBoundary>
              <IndexPage />
            </ErrorBoundary>
          </Switch>
        </Router>
        </>
    );
  }
}
