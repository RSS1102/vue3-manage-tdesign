<template>
  <div class="forms">
    <t-form ref="form" :data="addData" :colon="true" @submit="addShow = true" class="t-form-add">
      <t-form-item label="添加导航" name="navindex">
        <t-input v-model="addData.navindex" placeholder="请输入navindex" clearable />
        <t-button theme="primary" type="submit">添加</t-button>
      </t-form-item>
    </t-form>

    <t-form ref="form" :data="delData" :colon="true" @submit="delShow = true" class="t-form-del">
      <t-form-item label="删除导航" name="navindex">
        <t-select
          v-model="delData.id"
          :options="navOptions"
          :keys="{ label: 'navindex', value: 'id' }"
          placeholder="请选择navindex"
          clearable
        />
        <t-button theme="primary" type="submit">删除</t-button>
      </t-form-item>
    </t-form>
    <t-form ref="form" :data="upDataId" :colon="true" @submit="upShow = true" class="t-form-up">
      <t-form-item label="修改导航" name="navindex">
        <t-select
          v-model="upDataId.id"
          :options="navOptions"
          :keys="{ label: 'navindex', value: 'id' }"
          placeholder="请选择navindex"
          clearable
        />
        <t-icon name="swap" size="35px" />
        <t-input v-model="upData.navindex" placeholder="请输入navindex" clearable />
        <t-button theme="primary" type="submit">修改</t-button>
      </t-form-item>
    </t-form>
  </div>
  <t-dialog
    :visible.sync="addShow"
    theme="info"
    header="提示"
    :on-cancel="() => (addShow = false)"
    :on-confirm="addSubmit"
  >
    <template #body>
      确定添加：
      <span class="dialog-body">{{ addData.navindex }}</span>
    </template>
  </t-dialog>
  <t-dialog theme="info" header="提示" :visible.sync="delShow" @confirm="delSubmit" :onClose="() => (delShow = false)">
    <template #body>
      确认删除Id 为：
      <span class="dialog-body">{{ delData.id }}</span>
    </template>
  </t-dialog>
  <t-dialog theme="info" header="提示" :visible.sync="upShow" @confirm="upSubmit" :on-cancel="() => (upShow = false)">
    <template #body>
      确认将Id
      <span class="dialog-body">{{ upDataId.id }}</span>
      的字段;更新为
      <span class="updialog-body">{{ upData.navindex }}</span>
    </template>
  </t-dialog>
</template>
<script  setup lang="ts">
import { reactive, ref } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import { getblognav, addblogNav, upblognav, delblognav } from "@/api/blogs"

let addShow = ref(false)
let delShow = ref(false)
let upShow = ref(false)
let navOptions = ref()
const initNva = () => {
  getblognav().then(res => {
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
initNva()
const addData: NavType = reactive({ ...INITIAL_DATA });
const delData: NavType = reactive({ ...INITIAL_DATA });
const upDataId: NavType = reactive({ ...INITIAL_DATA });
const upData: NavType = reactive({ ...INITIAL_DATA });
const addSubmit = () => {
  addblogNav(addData).then(res => {
    console.log(res)
    addShow.value = false
    MessagePlugin.success("addSubmit成功");
    initNva()
  }).catch(() => {
    MessagePlugin.success("addSubmit失败");
  })
};
const delSubmit = () => {
  delblognav({ id: delData.id }).then((res) => {
    console.log(res)
    delShow.value = false
    MessagePlugin.success(" delSubmit成功");
    initNva()
  }).catch(() => {
    MessagePlugin.success(" delSubmit失败");
  })

};
const upSubmit = () => {
  let prams = { id: upDataId.id, navindex: upData.navindex }
  upblognav(prams).then((res) => {
    console.log(res)
    upShow.value = false
    MessagePlugin.success("upSubmit成功");
    initNva()
  }).catch(() => {
    MessagePlugin.success("upSubmit失败");
  })
  console.log(upDataId, upData);
};


</script>

<style lang="less">
.forms {
  display: flex;
  justify-content: space-between;
}
@media screen and (max-width: 1400px) {
  .forms {
    display: flex;
    flex-wrap: wrap;
  }
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
.dialog-body {
  color: rgb(233, 123, 21);
  font-weight: bold;
}
.updialog-body {
  color: rgb(17, 0, 255);
}
</style>
