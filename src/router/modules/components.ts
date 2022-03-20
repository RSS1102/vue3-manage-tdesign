import Layout from '@/layouts';
import ListIcon from '@/assets/assets-slide-list.svg';

export default [
  {
    path: '/list',
    name: 'list',
    component: Layout,
    redirect: '/list/base',
    meta: { title: '列表页', icon: ListIcon },
    children: [
      {
        path: 'base',
        name: 'listBase',
        component: () => import('@/pages/list/base/index.vue'),
        meta: { title: '基础列表页' },
      },
    ],
  },
];
