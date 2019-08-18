<template>
  <div class="container content-article" v-if="post">
    <div class="header-author">
      <Author :author="author" v-if="!!author"/>
      <div class="created-at">
        <span>há {{post.createdAt.timestampValue}}</span>
      </div>
    </div>
    <div class="content-image-related">
      <img :src="post.imgRelated.mapValue.fields.url.stringValue">
    </div>
    <div class="content-title">
      <h1>{{post.title.stringValue}}</h1>
    </div>
    <div class="content-render-article" v-html="dataPost"></div>
    <span class="title-to-comments">O que você acha?</span>
    <div class="content-comments">
      <Comments :id="id"/>
    </div>
  </div>
</template>

<script>
import { articleService } from '../../services'
import Author from '../../components/Author'
import Comments from '../../components/Comments'
export default {
  data () {
    return {
      title: 'Hello World!',
      post:  null,
      author:null,
      dataPost: null
    }
  },

  components:{Author, Comments},
  computed:{
    id(){
      return this.$route.params.id
    }
  },
  async mounted(){
    const item = await articleService.article(this.$route.params.id)
    if(item){
      this.post = item
      this.dataPost = item.editorData.stringValue
      this.author = item.author
    }


  }
}
</script>

<style>
.header-author{
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
.content-article{
  padding: 20px;
  max-width: 1336px;
  margin: 0 auto;
}
.content-title{
  margin: 20px 0;
  padding: 0 5%;
}
.content-title h1{
  font-weight: bold;
}
.content-image-related img{
  max-width: 100%;
  margin: 0 auto;
  display: block;
}
.content-render-article img{
  width: 100%;
}
.content-render-article p{
  padding: 0 8%;
}
.title-to-comments{
  display: block;
  margin: 30px 0;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
}
.content-comments{
  max-width: 90%;
  margin: 0 auto;
}
</style>
