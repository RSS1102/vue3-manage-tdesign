<template>
  <div>
    <div class="tinymce-boxz">
      <Editor v-model="content" :api-key="tiny.apiKey" :init="tiny.init"></Editor>
    </div>
    <div>{{ content }}</div>
  </div>
</template>
<script lang="ts" setup>
import Editor from "@tinymce/tinymce-vue";
import { reactive, ref } from "vue";

const content = ref("默认文字");
const tiny = reactive({
  apiKey: "nnhndkfj0yhexayfk80mxz0szlnvenzg12b1akg9l2krzqth",
  //https://github.com/tinymce/tinymce-vue/blob/main/src/demo/views/Iframe.vue
  init: {
    language: "zh_CN", //语言类型
    placeholder: "在这里输入文字", //textarea中的提示信息
    width: '100vw',
    min_height: 220,
    height: 500, //注：引入autoresize插件时，此属性失效
    resize: "both", //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
    branding: false, //tiny技术支持信息是否显示
    // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
    // elementpath: false, //元素路径是否显示
    font_formats:
      "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;", //字体样式
    plugins:
      "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave emoticons", //插件配置 axupimgs indent2em
    toolbar: [
      "fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat ",
      "styleselect formatselect fontselect fontsizeselect |  table image  emoticons charmap hr pagebreak insertdatetime  selectall visualblocks searchreplace | code  preview | indent2em lineheight formatpainter",
    ],
    // 图片上传
    /**
     * 指定上传图片的后端处理程序的URL。 给返回的相对路径指定它所相对的基本路径。
     * 指定上传图片的后端处理程序的URL。
     * 给返回的相对路径指定它所相对的基本路径。
     */
    // automatic_uploads: false,
    images_upload_url: '/cweb/cBlogs/upLoadFile',
    images_upload_base_path: '/files',
  }
})
</script>
