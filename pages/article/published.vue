<template>
  <div class="container content-article" v-if="post">

    <div v-if="post.videoRelated.stringValue" class="content-video">
    <div    class="video-embed">
      <iframe
      :src="post.videoRelated.stringValue"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      ></iframe>
    </div>

      <ArticlesList :article="relatedArticles" class="video-release-related" />
    </div>

    <div class="content-image-related" v-if="post.imgRelated.stringValue && this.post.type.stringValue === 'article'"
      :style="{ backgroundImage: 'url(\'' + post.imgRelated.stringValue + '\')' }">
    </div>

    <div class="content-title">
      <h1>{{post.title.stringValue}}</h1>
    </div>
    <div class="content-header-author">
      <div class="header-author">
        <Author :author="author" v-if="!!author" :dateRelease="post.createdAt.timestampValue"/>
        <div class="article-interactions">
          <interactions :id="id"  :list="post.like.arrayValue.values" v-if="post.like" />
          <SocialShare :item="post" />
        </div>
      </div>
    </div>

    <div class="content-render-article" v-html="dataPost"></div>

    <div class="content-comments">
      <Comments :id="id"/>
    </div>

    <ArticlesNav :article="relatedArticles"/>

  </div>
</template>

<script>
import { articleService } from '../../services'
import Author from '../../components/Author'
import Comments from '../../components/Comments'
import SocialShare from '../../components/SocialShare'
import ArticlesNav from '../../components/ArticlesNav'
import ArticlesList from '../../components/ArticlesList'
import Interactions from '../../components/Like'
import moment from 'moment'

export default {
  data () {
    return {
      post:  null,
      author:null,
      dataPost: null,
      relatedArticles:[]
    }
  },

  components:{Author, Comments, SocialShare, ArticlesNav,Interactions,ArticlesList},
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
      this.setAview()
    }
  },
  methods:{
    async related(){
      const published = await articleService.list()
      this.relatedArticles = published
    },
    setAview(){
      let getTime = new Date()
      localStorage.setItem('lastSeen', moment(getTime).format())
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
.content-video{
  display: flex;

}
.video-embed{
  width: 70%;

}
.video-embed iframe{
  width: 100%;
    height: calc(100vh);
}
.video-release-related{
  width: 30%
}
.content-header-author{
  max-width:80%;
  margin: 0 auto;
}
.content-header-author .share-article{text-align: right;}
.header-author{
  display: flex;
  justify-content: space-between;
  margin:0 auto;
  margin-bottom: 40px;
}
.header-author .author{
  padding-left: 0;
}

.content-article{
  max-width: 1980px;
  margin: 0 auto;
  color: #fff;
  padding-bottom: 65px;
}

.content-title{
  margin: 0 auto;
  width: 100%;
  margin: 20px 0;
  text-align: center;
  padding:0 3%;
}
.content-title h1{
  font-weight: bold;
  color: #fff;
  font-size: 44px;
  line-height: 62px;
}
.content-image-related{
  height: calc(100vh - 80px);
  background-size: cover;
  background-position: center;

}
.content-image-related img{
  max-width: 100%;
  margin: 0 auto;
  display: block;
}
.content-render-article{
  max-width: 80%;
  margin: 0 auto;
  text-align: center;
}
.content-render-article img{
  width: 100%;
}
.content-render-article ul li{
display: list-item;
list-style: disc;
}
.content-render-article blockquote{
  border-left: 2px solid #fff;
  max-width: 67%;
  margin: 0 auto;
}
.content-render-article blockquote p{
  padding: 0;
  max-width: 90%;
  font-style: italic;
}
.content-render-article ul,
.content-render-article ol{
  text-align: left;
  max-width: 67%;
  margin: 0 auto;
  padding: 0;
  font-size: 20px;
  list-style-type: disc;
  line-height: 36px;
  padding-inline-start:40px;
}


.content-render-article ol{
  list-style: none;
  counter-reset: my-awesome-counter;
}
.content-render-article ol li{
  counter-increment: my-awesome-counter;
}
.content-render-article ol li::before {
  content: counter(my-awesome-counter) ".";
  color: #93999d;
  margin-right: 6px;
  margin-left: -22px;
}
.content-render-article table td{
  border:1px solid #93999d;
  padding: 10px;
}
.content-render-article table{
  max-width: 80%;
  margin: 0 auto;
  padding: 30px 0;
  display: block;
  border-color: #93999d;
}
.content-render-article h2{
  font-size: 34px;
}
.content-render-article h3{
  font-size: 27px;
}
.content-render-article a{
  color: #de8145
}
.content-render-article a:hover{
  text-decoration: underline;
  color: #ca601c;
}
.content-render-article a:focus{
  text-decoration:none;
}
.content-render-article h4{
  font-size: 23px;
}
.content-render-article h2,
.content-render-article h3,
.content-render-article  h4{
  max-width: 67%;
  margin: 0 auto;
  margin-top: 30px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: left;
}
.content-render-article .image-style-align-left{
  max-width: 40%;
  margin: 0 auto;
}
.content-render-article .image-style-align-right{
  max-width: 70%;
  margin: 0 auto;
}
.content-render-article p{
  color: #fff;
  font-size: 20px;
  line-height: 36px;
  max-width: 67%;
  margin: 0 auto;
  margin-bottom: 25px;
  margin-top: 25px;
  text-align: left;
}
.content-render-article p i{
  color: #fff;
}
.content-render-article p a{
  color: #de8145;
}
.title-to-comments{
  display: block;
  margin: 30px 0;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
}
.content-comments{
  margin-top: 50px;
  margin: 0 auto;
  width: 80%;
}
.content-title-comments{
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
}
.article-interactions{
  display: flex;
}
.article-interactions .like-button i{
  margin-right: 10px;
}
@media screen and (max-width: 980px){
  .content-render-article{
    max-width: 100%;
  }
  .content-render-article p{
    max-width: 90%;
    font-size: 18px;
    line-height: 36px;
  }
  .content-title h1{
    font-size: 20px;
    line-height: 30px;
  }
  .content-title-comments{
    font-size: 20px;
  }
  .content-comments .like-button i{
    font-size: 26px;
  }
  .content-comments{
    width: 100%;
  }
}
</style>
