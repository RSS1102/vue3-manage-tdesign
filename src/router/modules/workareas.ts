import Layout from '@/layouts';
import ListIcon from '@/assets/assets-slide-list.svg';

export default [
  {
    path: '/workarea',
    name: 'workarea',
    component: Layout,
    redirect: '/list/blogs',
    meta: { title: '博客', icon: ListIcon },
    children: [
      {
        path: 'blogcont',
        name: 'blogcont',
        component: () => import('@/pages/workarea/blogcont/index.vue'),
        meta: { title: '博客管理' },
      },
      {
        path: 'blogs',
        name: 'blogs',
        component: () => import('@/pages/workarea/blogs/index.vue'),
        meta: { title: '博客发布' },
      },
    ],
  },
];
