import React from 'react';
// import * as Sentry from '@sentry/react';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Switch, Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import ErrorBoundary from '@components/ErrorBoundary/index';
import IndexPage from '@/layout/index';
import Login from '@/pages/Login';
import './styles/index.less';

const history = createHashHistory();

// Sentry.init({ dsn: 'https://11f12914dc114782b37d9d94c8839a40@o414598.ingest.sentry.io/5304319' });

export default class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zh_CN}>
        <Router history={history}>
          <Switch>
            <Route path='/login' exact component={Login} />
            <ErrorBoundary>
              <IndexPage />
            </ErrorBoundary>
          </Switch>
        </Router>
      </ConfigProvider>
    );
  }
}
