import React, { Component, Suspense } from 'react';
import { Switch, Redirect, Router, Route } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { createHashHistory } from 'history';
import { onConnect, removeAllListeners, disconnect } from '@components/Socket/index';
import Siderbar from './SideBar';
import LayoutHeader from '@components/LayoutHeader/index';
import routes from '@/routes/index';
import './index.less';

const { Header, Content, Sider } = Layout;

const history = createHashHistory();
class Index extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  componentDidMount() {
    disconnect();
    removeAllListeners();
    onConnect();
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Router history={history}>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0
            }}
          >
            <div className='logo' />
            <Siderbar />
          </Sider>
          <Layout
            style={{
              marginLeft: this.state.collapsed ? 80 : 200,
              backgroundColor: '#fafafa',
              minHeight: '100vh',
              transition: 'all .3s'
            }}
          >
            <Header className='header'>
              <LayoutHeader />
            </Header>
            <Content className='home-content'>
              <Suspense
                fallback={
                  <section className='page-spin'>
                    <Spin />
                  </section>
                }
              >
                <Switch>
                  {routes.map((v, index) => {
                    const Comp: any = v.component;
                    return (
                      <Route
                        key={index}
                        path={v.path}
                        component={v.component}
                        exact
                      ></Route>
                    );
                  })}
                  <Redirect from='/*' to='/customMonitor' />
                </Switch>
              </Suspense>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default Index;
