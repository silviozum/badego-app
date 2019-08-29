<template>
  <div class="container">

    <div class="content-editor">
      <input type="title" v-model="post.title" class="edit-post-title">
      <form ref="form">

        <input
        id="files"
        type="file"
        name="file"
        ref="uploadInput"
        accept="image/*"
        :multiple="false"
        @change="detectFiles($event)" />
      </form>
      <div v-if="post.imgRelated">
        <img :src="post.imgRelated">
      </div>
      <ckeditor :editor="editor" v-model="post.editorData" :config="editorConfig"></ckeditor>
    </div>
    <div class="content-tags">
      <span>Tags</span>
      <Tags @getTags="upTags"/>
    </div>
    <div class="content-submit">
      <a-button v-on:click="submitPost()" ghost>publicar</a-button>
    </div>
  </div>
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Tags from '../../components/Tags'
import { userService } from '../../services'



export default {
  data () {
    return {
      post:{
          title:'título aqui fião',
          createdAt: new Date(),
          tags:'',
          imgRelated:'',
          editorData: '<p>manda ki fião</p>',
      },
      editor: ClassicEditor,
      editorConfig: {
        height: '500px',
        image: {
            // You need to configure the image toolbar, too, so it uses the new style buttons.
            toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight', 'imageUpload' ],
            styles: [
                // This option is equal to a situation where no style is applied.
                'full',
                // This represents an image aligned to the left.
                'alignLeft',
                // This represents an image aligned to the right.
                'alignRight'
            ]
        }
      }
    }
  },
  created(){
      this.$store.commit('menu/menuList', false)
      if(!this.author.logged){
        this.$router.push({ path: '/'})
      }
  },
  computed:{
    author(){
      const user = this.$store.getters['user/getUser']
      return user
    }
  },
  methods:{
    detectFiles(e){
      let fileList = e.target.files || e.dataTransfer.files
        Array.from(Array(fileList.length).keys()).map(x => {
          this.uploadImage(fileList[x])
        })
    },
     uploadImage (file) {
      const uploadImageReleated = userService.uploadImageReleated(file)

      uploadImageReleated.then(function(res){
        console.log(res)
      })


    },
    async submitPost(){
      this.post.author = this.author
      this.post.like = []
      const publish = await userService.publish(this.post)
    },
    onSuccess(e){
      this.post.imgRelated.url = e.cdnUrl
      this.post.imgRelated.uuid = e.uuid
    },
    onError(){
      alert(e)
    },
    upTags(e){
      this.post.tags = e
    }
  },

  components:{
     Tags
  }
}
</script>

<style>
.content-editor{
  max-width:1336px;
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
 .image .ck-editor__editable{
   min-height: auto;
 }
 .media-related-post img{
  display: block;
  margin-top: 10px;
  margin: 0 auto;
 }
 .content-tags{
   margin: 20px 0;
   padding-left: 20px;
 }
</style>
