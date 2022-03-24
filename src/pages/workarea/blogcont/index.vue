<template>
  <div class="forms">
    <t-form ref="form" :data="addData" :colon="true" @submit="addSubmit">
      <t-form-item label="添加导航" name="navindex">
        <t-input v-model="addData.navindex" placeholder="请输入navindex" clearable />
        <t-button theme="primary" type="submit">添加</t-button>
      </t-form-item>
    </t-form>

    <t-form ref="form" :data="delData" :colon="true" @submit="delSubmit">
      <t-form-item label="删除导航" name="navindex">
        <t-select v-model="delData.navindex" :options="options1" placeholder="请选择navindex" clearable />
        <t-button theme="primary" type="submit">删除</t-button>
      </t-form-item>
    </t-form>
    <t-form ref="form" :data="selData" :colon="true" @submit="selSubmit">
      <t-form-item label="查询导航" name="navindex">
        <t-select v-model="selData.navindex" :options="options1" placeholder="请选择navindex" clearable />
        <t-button theme="primary" type="submit">查询</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const INITIAL_DATA = {
  navindex: '',
};

const options1 = [
  { label: '架构云', value: '1' },
  { label: '大数据', value: '2' },
  { label: '区块链', value: '3' },
];

const addData = reactive({ ...INITIAL_DATA });
const delData = reactive({ ...INITIAL_DATA });
const selData = reactive({ ...INITIAL_DATA });
const addSubmit = () => {
  MessagePlugin.success('addSubmit成功');
  console.log(addData);
};
const delSubmit = () => {
  MessagePlugin.success('delSubmit成功');
  console.log(delData);
};
const selSubmit = () => {
  MessagePlugin.success('selSubmit成功');
  console.log(selData);
};
</script>
<style lang="less">
.forms {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.t-form {
  border-radius: 5px;
  margin: 0 10px;
  padding: 20px;
  background: #fff;
  width: 420px;
}

.t-button {
  margin-left: 15px;
}
</style>
