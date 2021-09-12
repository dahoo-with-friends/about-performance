/**
 * 菜单对应的路由要与 route/index.tsx 对应的路由一致
 */
const menu = [
  {
    icon: 'PieChartOutlined',
    name: '2',
    content: [
      {
        path: '/memory',
        name: '内存测试',
      },
      {
        path: '/context',
        name: 'context',
      },
    ],
  },
  {
    icon: 'MergeCellsOutlined',
    name: '1',
    content: [
      {
        path: '/subscriptionGroup',
        name: '性能测试1',
      },
      {
        path: '/mySubscription',
        name: '我的订阅',
      },
    ],
  },
]

export default menu
