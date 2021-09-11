import React from 'react';
import { Menu } from 'antd';
const { SubMenu } = Menu;
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  GiftOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
  AreaChartOutlined,
  TeamOutlined,
  RedditOutlined,
  PieChartOutlined,
  MergeCellsOutlined,
  DesktopOutlined,
  SlidersOutlined
} from '@ant-design/icons';
import menu from '@/routes/menu';

const iconMap: any = {
  UserOutlined: UserOutlined,
  UploadOutlined: UploadOutlined,
  VideoCameraOutlined: VideoCameraOutlined,
  GiftOutlined: GiftOutlined,
  ApartmentOutlined: ApartmentOutlined,
  AppstoreOutlined: AppstoreOutlined,
  AreaChartOutlined: AreaChartOutlined,
  TeamOutlined: TeamOutlined,
  RedditOutlined: RedditOutlined,
  MergeCellsOutlined: MergeCellsOutlined,
  PieChartOutlined,
  DesktopOutlined,
  SlidersOutlined
};

// 递归生成侧边树数据结构==>高亮选项、及展开submenu
const getMenuIndex = () => {
  const getNewArr = (menu: any, arr: any[] = []) => {
    for (let item of menu) {
      if (Array.isArray(item.content)) {
        if (item.openKeys) {
          item.content.forEach((v: any) => {
            v.openKeys = [...item.openKeys, item.name];
          });
        } else {
          item.content.forEach((v: any) => {
            v.openKeys = [item.name];
          });
        }
        getNewArr(item.content, arr);
      } else {
        arr.push(item);
      }
    }
    return arr;
  };
  const menuArr = getNewArr(menu);
  // console.log(menuArr);
  const item = menuArr.find(v => location.hash.includes(v.path)) || menuArr[0];
  return item;
};

// 递归生成侧边树
const createMenuList = (list: any[]) => {
  return list.map((item: any, index) => {
    const Icon = iconMap[item.icon];
    if (Array.isArray(item.content)) {
      return (
        <SubMenu
          key={item.name}
          title={
            <span>
              {Icon && <Icon />}
              <span>{item.name}</span>
            </span>
          }
        >
          {createMenuList(item.content)}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.name}>
          <Link to={item.path}>
            {Icon && <Icon />}
            <span className='nav-text'>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    }
  });
};

const SideBar = () => {
  const item = getMenuIndex();
  const keys = item ? [item.name] : [];
  const openKeys = item ? item.openKeys : [];
  return (
    <Menu
      className='select-none'
      theme='dark'
      mode='inline'
      defaultSelectedKeys={keys}
      defaultOpenKeys={openKeys}
    >
      {createMenuList(menu)}
    </Menu>
  );
};

export default React.memo(SideBar);
