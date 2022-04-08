<template>
  <t-table
    :data="data"
    :columns="columns"
    :row-key="rowKey"
    :vertical-align="verticalAlign"
    :loading="isLoading"
    :pagination="pagination"
    bordered
    stripe
    @change="rehandleChange"
  />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getBlogs } from "@/api/blogs"
import { Interface } from 'readline';
import { changeChartsTheme } from '@/pages/dashboard/base';

/**
 * data请求到的数据 []
 * columns表格标题 []
 * isLoading是否加载中  Boolean
 * pagination 分页{}
 */

const columns = [
  {
    width: 15,
    colKey: 'id',
    title: 'ID',
  },
  {
    width: 30,
    colKey: 'navindex',
    title: 'NavIndex',
  },
  {
    width: 50,
    colKey: 'title',
    title: 'title',
  },
  {
    width: 30,
    colKey: 'updatedAt',
    title: 'updated-time',
  },
  {
    width: 30,
    colKey: 'createdAt',
    title: 'created-time',
  },
  {
    width: 20,
    colKey: 'visited',
    title: '浏览人数',
  },
  {
    width: 10,
    colKey: '',
    title: '是否隐藏',
  },
  {
    width: 10,
    colKey: '',
    title: '编辑',
  },
];
interface response {
  rows: number
  count: Array<string>,

}

const data = ref([]);
const isLoading = ref(false);
// 数据总条数
const total = null;
const pagination = ref({
  current: 0,
  pageSize: 10,
  total,
});

const fetchData = async (pagination: { current: number; pageSize: number; total: any; }) => {
  try {
    isLoading.value = true;
    const { current, pageSize } = pagination;
    let prams = { offset: current, limit: pageSize, navindex: "" }
    const results = await getBlogs(prams);
    console.log('请求到的数据', results.data,);
    data.value = results.data.rows;
    pagination.total = results.data.count;
    console.log('分页数据', results);
  } catch (err) {
    console.log(err);
    data.value = [];
  }
  isLoading.value = false;
};
interface changeParamsType {
  pagination: {
    current: number; pageSize: number;
  };
}
const rehandleChange = async (changeParams: changeParamsType, triggerAndData: []) => {
  console.log('分页、排序、过滤等发生变化时会触发 change 事件：', changeParams, triggerAndData);
  const { current, pageSize } = changeParams.pagination;
  const pagination = { current, pageSize, total };
  await fetchData(pagination);
};

onMounted(async () => {
  await fetchData(pagination.value);
});

const rowKey = 'property';
const verticalAlign = 'top';
</script>
