import Layout from '@/layouts';
import ListIcon from '@/assets/assets-slide-list.svg';
import { defineAsyncComponent } from 'vue';
const blogcont = () => import('../../pages/workarea/blogcont/index.vue');
const blogs = () => import('../../pages/workarea/blogs/index.vue');
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
        component: blogcont,
        meta: { title: '博客管理' },
      },
      {
        path: 'blogs',
        name: 'blogs',
        component: blogs,
        meta: { title: '博客发布' },
      },
    ],
  },
];
