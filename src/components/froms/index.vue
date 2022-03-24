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

const columns = [
  {
    width: 200,
    colKey: 'name',
    title: '姓名',
    render(h, { row: { name } }) {
      return name ? `${name.first} ${name.last}` : 'UNKNOW_USER';
    },
  },
  {
    width: 200,
    colKey: 'gender',
    title: '性别',
  },
  {
    width: 200,
    colKey: 'phone',
    title: '联系方式',
    render(h, { row: { phone } }) {
      return phone;
    },
  },
  {
    colKey: 'email',
    title: '邮箱',
  },
];

const data = ref([]);
const isLoading = ref(false);
// 数据总条数
const total = 120;
const pagination = ref({
  current: 1,
  pageSize: 10,
  total,
});

const fetchData = async (paginationVal = pagination.value) => {
  try {
    isLoading.value = true;
    const { current, pageSize } = pagination.value;
    // 请求可能存在跨域问题
    const response = await fetch(`https://randomuser.me/api?page=${current}&results=${pageSize}`);
    const { results } = await response.json();
    console.log('请求到的数据', results);
    data.value = results;
    pagination.value = {
      ...paginationVal,
    };
    console.log('分页数据', results);
  } catch (err) {
    console.log(err);
    data.value = [];
  }
  isLoading.value = false;
};

const rehandleChange = async (changeParams, triggerAndData) => {
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
