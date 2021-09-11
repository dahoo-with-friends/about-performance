import React, { Component } from 'react';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { withRouter, Link } from 'react-router-dom';
import { Avatar, Dropdown, Menu, Breadcrumb, Select } from 'antd';
import './index.less';
interface IProps {
  history: any;
  location: any;
}

interface IState {}

class Index extends Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  signOut = () => {
    const { history } = this.props;
    localStorage.token = '';
    history.replace('/login');
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item key='signOut'>
          <a target='_blank' rel='noopener noreferrer' onClick={this.signOut}>
            退出
          </a>
        </Menu.Item>
      </Menu>
    );
    // const breadcrumbNameMap = {
    //   '/customMonitor': '自定义监控',
    //   '/strike': '预警中心 / 订阅组',
    //   '/immm': '预警中心 / 我的订阅',
    //   '/monitorDetail': '自定义监控 / 监控详情',
    // };
    const { Option } = Select;
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          {/* <Link to={url}>{breadcrumbNameMap[url]}</Link> */}
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
    ].concat(extraBreadcrumbItems);
    return (
      <section className='layout-header'>
        <div className='header-left'>
          <Breadcrumb className='breadcrumb'>{breadcrumbItems}</Breadcrumb>
        </div>
        <div className='header-right'>
          <Dropdown className='drop-down' overlay={menu}>
            <div>
              <Avatar className='avatar' size={28} icon={<UserOutlined />} />
              <span className='name'>crazy</span>
            </div>
          </Dropdown>
        </div>
      </section>
    );
  }
}

export default withRouter(Index);
