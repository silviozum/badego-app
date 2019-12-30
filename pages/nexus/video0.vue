<template>
  <div class="main-to-post">
  <div class="content-editor">

    <div class="content-banner-editor"

      :style="{ backgroundImage: 'url(\'' + post.imgRelated + '\')' }">
      <Loading v-if="loading"/>
      <form ref="form" >
        <input
        id="files"
        type="file"
        class="custom-file-input"
        name="file"
        ref="uploadInput"
        accept="image/*"
        :multiple="false"
        @change="detectFiles($event, 'image')" />
      </form>
    </div>

    <div class="content-video-editor">
      <!-- <Loading v-if="loading"/>
      <form ref="form" >
        <input
        id="files"
        type="file"
        class="custom-file-input custom-file-video"
        name="file"
        accept="video/*"
        :multiple="false"
        @change="detectFiles($event, 'video')" />
      </form>
      <div class="content-video-preview" v-if="post.videoRelated">
        <video controls>
          <source :src="post.videoRelated" type="video/mp4">
        </video>
      </div> -->
      <input v-model="post.videoRelated" class="edit-post-title" v-on:change="getUrlVideo($event)">
      <iframe
      width="560"
      height="315"
      :src="this.post.videoRelated"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      v-if="showIframe"
      ></iframe>
    </div>

    <input type="title" v-model="post.title" class="edit-post-title">
    <ckeditor :editor="editor" v-model="post.editorData" :config="editorConfig"></ckeditor>
    <div class="content-tags">
      <span>Tags</span>
      <p>Adicione Tags (pelo menos 3) para que os leitores saibam do que se trata sua materia </p>
      <Tags @getTags="upTags" :alreadyTags="post.tags" v-if="toEditOpen"/>
        <Tags @getTags="upTags" v-else/>
    </div>
    <div class="content-create-preview">
      <span>Preview </span>
      <p>Se necessário, personalize o título, descrição ou imagem que será exibido no feed</p>
      <div class="content-preview-cols">
        <div class="create-preview-inputs">
          <input type="title" v-model="post.title" class="edit-post-title">
          <textarea  v-model="post.textPreview" />
        </div>
        <div class="preview-thumb" v-if="post.imgRelated">
          <div class="tile">
            <div class="tile__media">
              <img class="tile__img" :src="post.imgRelated " alt=""  />
            </div>
            <div class="tile__details">
              <div class="tile__details_header">
                <span class="date-release">{{post.createdAt| moment("from", "now", true)}}</span>
                <span class="time-release">6 min de leitura</span>
              </div>
              <div class="tile__title">
                <h3> {{post.title}}</h3>
                <p>{{post.textPreview}}</p>
              </div>
            </div>
          </div>
      </div>
      <div class="content-banner-editor" v-else
        :style="{ backgroundImage: 'url(\'' + post.imgRelated + '\')' }">
        <Loading v-if="loading"/>
        <form ref="form" >
          <input
          id="files"
          type="file"
          class="custom-file-input"
          name="file"
          ref="uploadInput"
          accept="image/*"
          :multiple="false"
          @change="detectFiles($event, 'image')" />
        </form>
      </div>
      </div>
    </div>
    <div class="content-submit" v-if="toEditOpen">
      <button v-on:click="edit()">salvar</button>
    </div>
    <div class="content-submit" v-else>
        <button v-on:click="submitPost()">salvar</button>
    </div>

  </div>
</div>
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Tags from '../../components/Tags'
import Loading from '../../components/Loading'
import { userService } from '../../services'
import { articleService } from '../../services'

export default {
  data () {
    return {
      toEdit: '',
      loading:false,
      showIframe:false,
      titleType:'artigo',
      post:{
          title:'Título da materia preenche o thumb',
          createdAt: new Date(),
          tags:'',
          type:'article',
          textPreview: '',
          like:['pora'],
          imgRelated:'',
          videoRelated:'URL (youtube,vimeo,etc)',
          editorData: '<p>manda ki fião</p>',
      },
      editor: ClassicEditor,
      editorConfig: {
        height: '500px',
        image: {
            // You need to configure the image toolbar, too, so it uses the new style buttons.
            toolbar: [
              'imageTextAlternative', '|',
              'imageStyle:alignLeft',
              'imageStyle:full',
              'imageStyle:alignRight',
              'imageUpload'
            ],
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
    },
    toEditOpen(){
      return this.$route.params.id
    }

  },
  methods:{
    navegation(type){
      this.post.type=type
      this.titleType = type
    },
    detectFiles(e, type){
      let fileList = e.target.files || e.dataTransfer.files
        Array.from(Array(fileList.length).keys()).map(x => {
          if(type === 'image'){
              this.uploadImage(fileList[x])
          }else if(type === 'video'){
              this.uploadVideo(fileList[x])
          }
        })
    },
    //  async uploadVideo (file) {
    //    this.loading = true
    //      const path = await userService.uploadVideoReleated(file)
    //      console.log(path)
    //      if(path.ref.fullPath){
    //         this.getVideo(path.ref.fullPath)
    //      }
    // },
    getUrlVideo(e){

      var video_id = this.post.videoRelated.split('v=')[1];
      var ampersandPosition = video_id.indexOf('&');
      if(ampersandPosition != -1) {
        this.post.videoRelated = video_id.substring(0, ampersandPosition)

      }
      this.post.videoRelated =  'https://www.youtube.com/embed/' + video_id
      this.showIframe=true

    },
    async uploadImage (file) {
      this.loading=true
        const path = await userService.uploadImageReleated(file)
        if(path.ref.fullPath){
           this.getImage(path.ref.fullPath)
        }
    },
    async getImage(path){
      const file = await userService.getImage(path)
      this.post.imgRelated = file
      this.loading=false
    },
    async getVideo(path){
      const file = await userService.getImage(path)
      this.post.videoRelated = file
      console.log(file)
      this.loading=false
    },


    submitPost(){
      this.post.author = this.author

      if(this.post){
        userService.publish(this.post)
        this.$router.push({path:'/'})
      }

    },
    async edit(){
      this.post.author = this.author

      let id = this.$route.params.id
      const publish = await userService.edit(id, this.post)
      this.$router.push({name: 'article-id', params: { id:this.toEditOpen }})
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
    },
    previewText(){
      let regex = /(<([^>]+)>)/ig;
       let cleanData = this.post.editorData.replace(regex, "");
       this.post.textPreview = cleanData.substring(0,90) + '...'
    }
  },
  async mounted(){
    if(this.$route.params.id){
      const articleId =  await articleService.article(this.$route.params.id)
      if(articleId){
        // let tags = articleId.tags.arrayValue.values
        // let tagsManager = []
        //
        // tags.map(function(i){
        //   tagsManager.push(i.stringValue)
        // })

        this.post.editorData = articleId.editorData.stringValue
        this.post.imgRelated = articleId.imgRelated.stringValue
        // this.post.tags = tagsManager
        this.post.title = articleId.title.stringValue
        this.post.type = articleId.type.stringValue
        this.post.textPreview = articleId.textPreview.stringValue
      }else{
        console.log('hoje nao')
      }
    }

},
  created(){
    this.previewText()
    this.post.type = "video"
  },
  components:{
     Tags,
     Loading
  }
}
</script>

<style>
.content-editor{
  max-width:1055px;
  margin: 0 auto;
  display: block;
  padding: 15px;
}
.content-editor img{
  width: 100%;
}
.content-editor-header{
  padding-top: 50px;
}
.content-editor-header .header-type{
  font-weight: bold;
  font-size: 35px;
  letter-spacing: -1px;
}
.content-editor-header nav{
  margin-top: 30px;
}
.content-editor-header nav li{
  display: inline-block;
  margin-right: 20px;
}
.content-banner-editor{
  width: 400px;
  height: 276px;
  display: block;
  background-position: center;
  background-size: cover;
  position: relative;
}
.content-video-editor{
  width: 400px;
  display: block;
  background-position: center;
  background-size: cover;
  position: relative;
}
.content-banner-editor form{
  width: 400px;
  height: 276px;
  background-size: cover;
  background-position: center;
}
.content-editor-header nav li button{
  border-radius: 5px;
  padding: 8px 20px;
  border: 2px solid #25292c;
  background-color:transparent;
  font-weight: bold;
}
.content-editor-header nav li button:active{outline: none;}
.content-editor-header nav li button:hover,  .active-button-editor-header{
    border: 2px solid #fff !important;
}
.edit-post-title{
  margin-bottom: 50px;
  width: 100%;
  text-indent: 12px;
  padding: 10px;
  color: #fff;
  font-size: 20px;
  margin-top: 60px;
  border: 1px solid #50595f;
  background-color: transparent;
}
.content-tags span{
  font-weight: bold;
  font-size: 20px;
}
.content-tags p{
  font-size: 14px;
  display: block;
  margin-top: 10px;
}
.media-related-post{
  margin-bottom: 30px;
}
.content-submit{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 50px;
}
.content-submit button{
    background-color: #de8145;
    border: 0;
    padding: 8px 20px;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}
.content-submit button:hover{
  background-color: #d6651c;
}
.ck-editor__editable {
  min-height: 500px;
 }
 .ck.ck-editor__main>.ck-editor__editable{
   background-color: transparent;
     border-color:#50595f !important;
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
 }
 .main-to-post{
   padding-top:20px;
 }

 .custom-file-input {
  color: transparent;
  width: 400px;
  height: 276px;
  margin: 20px 0;
  display: block;
  outline: none;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-video::before {
  content: 'upload do video' !important;
}
.custom-file-video, .custom-file-video:before {
  max-width: 500px!important;
}

.custom-file-input::before {
  content: 'imagem em destaque';
  color: #50595f;
  display: inline-block;
  background: rgba(54,59,63, 0.2);
  border: 1px solid #50595f;
  padding-left: 100px;
  padding-top: 130px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  font-size: 20px;
  width: 400px;
  height: 276px;
  position: absolute;
  top: 0;
  left: 0;
}
.custom-file-input:hover::before {
  border: 1px solid #67737b;
  color: #67737b;
}
.custom-file-input:active {
  outline: 0;
}
.content-create-preview span{
  font-size: 36px;
  font-weight: bold;
}
.content-create-preview p{
  font-size: 14px;
  display: block;
  margin-top: 10px;
}
.content-create-preview .edit-post-title{
  margin-top: 10px;
  margin-bottom: 10px;
}
.content-preview-cols{display:flex;}
.content-preview-cols > div{
  width: 50%;
  position: relative;
}
.preview-thumb .tile{
  width: 400px;
  height: 276px;
}
.preview-thumb .tile__details,.preview-thumb .tile__img {
  height: 276px;
}
.preview-thumb .tile__title p{opacity: 1;}
.create-preview-inputs{
  margin-right: 30px;
}
.create-preview-inputs textarea{
  background-color: transparent;
  outline: none;
  width: 100%;
  height: 150px;
  border: 1px solid #50595f;
  padding: 20px;
}
</style>
