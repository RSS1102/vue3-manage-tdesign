<template>
  <div class="forms">
    <t-form ref="form" :data="addData" :colon="true" @submit="addSubmit" class="t-form-add">
      <t-form-item label="添加导航" name="navindex">
        <t-input v-model="addData.navindex" placeholder="请输入navindex" clearable />
        <t-button theme="primary" type="submit">添加</t-button>
      </t-form-item>
    </t-form>
    <t-form ref="form" :data="delData" :colon="true" @submit="delSubmit" class="t-form-del">
      <t-form-item label="删除导航" name="navindex">
        <t-select v-model="delData.navindex" :options="navOptions" placeholder="请选择navindex" clearable />
        <t-button theme="primary" type="submit">删除</t-button>
      </t-form-item>
    </t-form>
    <t-form ref="form" :data="selData" :colon="true" @submit="upSubmit" class="t-form-up">
      <t-form-item label="修改导航" name="navindex">
        <t-select v-model="selData.navindex" :options="navOptions" placeholder="请选择navindex" clearable />
        <t-icon name="swap" size="35px" />
        <t-input v-model="addData.navindex" placeholder="请输入navindex" clearable />
        <t-button theme="primary" type="submit">修改</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script async setup lang="ts">
import { reactive, ref } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import { getblognav, addblogNav, upblognav, delblognav } from "@/api/blogs"

const INITIAL_DATA = {
  navindex: String
}

let navindex = await getblognav()
let navOptions = ref(navindex)
console.log(navindex)

const addData = reactive({ ...INITIAL_DATA });
const delData = reactive({ ...INITIAL_DATA });
const selData = reactive({ ...INITIAL_DATA });
const addSubmit = () => {
  // add-navindex
  addblogNav(addData).then(res => {
    MessagePlugin.success("addSubmit成功");
  }).catch(() => {
    MessagePlugin.success("addSubmit失败");
  })
  console.log(addData);
};
const delSubmit = () => {
  delblognav(delData).then(() => {
    MessagePlugin.success(" delSubmit成功");
  }).catch(() => {
    MessagePlugin.success(" delSubmit失败");
  })
  console.log(delData);
};
const upSubmit = () => {
  upblognav(delData).then(() => {
    MessagePlugin.success("upSubmit成功");
  }).catch(() => {
    MessagePlugin.success("upSubmit失败");
  })
  console.log(selData);
};
</script>
<style lang="less" scoped>
.forms {
  display: flex;
  flex-wrap: wrap;
}
.t-form {
  border-radius: 5px;
  margin: 10px;
  padding: 20px;
  background: #fff;
}
.t-form-add,
.t-form-del {
  width: 400px;
}
.t-form-up {
  width: 600px;
}

.t-button {
  margin-left: 15px;
}
</style>
