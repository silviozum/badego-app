<template>
  <div class="container content-article" v-if="post">

    <div class="content-image-related">
      <img :src="post.imgRelated.mapValue.fields.url.stringValue">
    </div>

    <div class="header-author">
      <Author :author="author" v-if="!!author" :dateRelease="post.createdAt.timestampValue"/>
    </div>
    <div class="content-title">
      <h1>{{post.title.stringValue}}</h1>
    </div>
    <div class="content-render-article" v-html="dataPost"></div>
    <div class="footer-post">

      <interactions :id="id"  :list="post.like.arrayValue.values" v-if="post.like" />

      <SocialShare :item="post" />
    </div>

    <ArticlesList :article="relatedArticles" :where="'article'"/>
    <span class="title-section">O que você acha?</span>
    <div class="content-comments">
      <Comments :id="id"/>
    </div>
  </div>
</template>

<script>
import { articleService } from '../../services'
import Author from '../../components/Author'
import Comments from '../../components/Comments'
import SocialShare from '../../components/SocialShare'
import ArticlesList from '../../components/ArticlesList'
import Interactions from '../../components/Like'

export default {
  data () {
    return {
      post:  null,
      author:null,
      dataPost: null,
      relatedArticles:[]
    }
  },

  components:{Author, Comments, SocialShare, ArticlesList,Interactions},
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
      this.title = this.post.title.stringValue
      this.related()
    }
  },
  methods:{
    async related(){
      const published = await articleService.list()
      this.relatedArticles = published
    }
  },
  head () {
 return {
      title: this.title,
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
.footer-post{
  display: block;
  margin: 60px 0;
}
.content-article{
  padding: 20px;
  max-width: 1336px;
  margin: 0 auto;
  padding-top: 45px;
  color: #fff;
  padding-bottom: 65px;
}
.interactions{
  float: left;
    padding-left: 12px;
    padding-top: 10px;
}
.content-title{
  margin: 20px 0;
  padding: 0 10px;
}
.content-title h1{
  font-weight: bold;
  color: #fff;
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
  padding: 0 10px;
  color: #000;
  font-size: 18px;
}
.content-render-article p i{
  color: #fff;
}
.content-render-article p a{
  color: #fff;
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
