<template>
  <div>
    <div class="edit-button">
      <t-form ref="form" :data="getData" :colon="true" class="t-sel-form">
        <t-form-item label="查找导航" name="navindex">
          <t-select v-model="getData.navindex" placeholder="请选择navindex" clearable @change="fetchData">
            <t-option v-for="item in navOptions" :key="item.navindex" :value="item.navindex"></t-option>
          </t-select>
        </t-form-item>
      </t-form>
      <div class="oper-btn">
        <t-button @click="operIsShow" theme="success">
          <div class="btn-text">
            <div>编辑归档标题</div>
            <div>(NavIndex)</div>
          </div>
        </t-button>
      </div>
    </div>
    <oper-dialog :isShow="isShow"></oper-dialog>
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
  </div>
</template>
<script  setup lang="ts">
import { getBlogs } from "@/api/blogs"
import { reactive, ref, onMounted } from "vue";
import { getBlognav, } from "@/api/blogsnav"
import operDialog from "@/pages/workarea/blogcont/operDialog.vue"

let isShow = ref(false)
const operIsShow = () => {
  isShow.value = true
}
let navOptions = ref()
const initNva = () => {
  getBlognav().then(res => {
    console.log(res.data)
    navOptions.value = res.data
  })
}
interface NavType {
  id: number,
  navindex: string
}
const INITIAL_DATA: NavType = {
  id: null,
  navindex: ''
}
// initNva()

const getData: NavType = reactive({ ...INITIAL_DATA });


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
  console.log(getData)
  try {
    isLoading.value = true;
    const { current, pageSize } = pagination;
    let prams = { offset: current, limit: pageSize, navindex: getData.navindex }
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

// onMounted(async () => {
//   await fetchData(pagination.value);
// });

const rowKey = 'property';
const verticalAlign = 'top';


</script>

<style lang="less">
.edit-button {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.oper-btn,
.t-sel-form {
  border-radius: 5px;
  margin: 10px;
  padding: 25px 50px;
  background: #fff;
}
.oper-btn .t-button {
  padding: 20px;
  margin: -5px 0;
}
</style>
