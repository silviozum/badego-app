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

    uploadPodcast(file){
      console.log(file)
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
      console.log(publish)
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
      this.post.type = "article"
  },
  components:{
     Tags,
     Loading
  }
}
</script>

<style>

</style>
