<template>
  <div class="container">

    <div class="content-editor">
      <input type="title" v-model="post.title" class="edit-post-title">
      <uploadcare publicKey="2c93340bc1569cf345b0" @success="onSuccess" @error="onError" class="media-related-post">
        <a-button>upload imagem em Destaque</a-button>
        <img :src="post.imgRelated.url" />
      </uploadcare>
      <ckeditor :editor="editor" v-model="post.editorData" :config="editorConfig"></ckeditor>
    </div>
    <div class="content-submit">
      <a-button  v-on:click="submitPost()">Post</a-button>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Uploadcare from 'uploadcare-vue'
export default {
  data () {
    return {
      post:{
          title:'título aqui fião',
          imgRelated:{
            url:'',
            uuid:''
          },
          editorData: '<p>manda ki fião</p>'
      },
      editor: ClassicEditor,
      editorConfig: {
        height: '500px'
      }
    }
  },
  created(){
      this.$store.commit('menu/menuList', false)

  },
  computed:{
    author(){
      const user = this.$store.getters['user/getUser']
      return user
    }
  },
  methods:{
    submitPost(){
      console.log(this.author)
      console.log(this.post)
    },
    onSuccess(e){
      console.log(e)
      this.post.imgRelated.url = e.cdnUrl
      this.post.imgRelated.uuid = e.uuid
    },
    onError(){

    }

  },
  components:{
    'uploadcare':Uploadcare
  }

}
</script>

<style>
.content-editor{
  max-width:900px;
  margin: 0 auto;
  margin-top: 50px;
  display: block;
  padding: 15px;
}
.edit-post-title{
  margin-bottom: 50px;
  width: 100%;
  text-indent: 12px;
  padding: 10px;
}
.media-related-post{
  margin-bottom: 30px;
}
.content-submit{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 50px;
}
.ck-editor__editable {
  min-height: 500px;
 }
 .media-related-post img{
   width: 100%;
 }
</style>
