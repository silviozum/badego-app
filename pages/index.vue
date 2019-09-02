<template>
  <div>
  <div class="home-container">
    <div class="b-release">
      <Release :item="item" v-if="item" />
    </div>
    <div class="b-articles">
      <ArticlesList :article="this.getArticles" class="list-articles"/>
      <div class="home-tags">
        <div class="title-site"><h2>tags</h2></div>
        <nav>
          <li v-for="(value,name) in tags">{{name}}</li>
        </nav>
      </div>
    </div>
  </div>
  <div class="b-carrousel">

    <ArticlesNav :article="this.getArticles"/>
  </div>
  </div>
</template>

<script>
import ArticlesList from '../components/ArticlesList'
import { articleService } from '../services'
import Author from '../components/Author'
import SocialShare from '../components/SocialShare'
import Release from '../components/Release'
import ArticlesNav from '../components/ArticlesNav'

export default {
  data () {
    return {
      title: 'Hello World!',
      getArticles: '',
      tags:''
    }
  },

  head () {
    return {
      title: 'Badego'
    }
  },
  methods:{
    async articlesList(){
      const published = await articleService.list()
      if(published.length > 0){
        this.getArticles = published
      }
    },
    async homeTags(){
      const getTags = await articleService.tags()
      this.tags = getTags
      console.log(getTags)

    }
  },
  computed:{
    item(){
      console.log(this.getArticles[0] )
      return this.getArticles[6]
    }
  },
  components:{
    ArticlesList,
    Author,
    SocialShare,
    Release,
    ArticlesNav
  },

  async mounted(){
    this.articlesList()
    this.homeTags()
  }
}
</script>

<style>
.ant-btn-ghost {
  border: none !important;
}
.home-container{
  display: flex;
  width: 100%;
  height: auto;
}
.b-carrousel .title-site{
  padding-left: 40px;
}
.b-release{
  width: 65%;
  display: block;
}

.b-articles{
  width: 32%;
  display: block;
}

.home-tags nav li{
  border: 1px solid #41484c;
  background-color: #2e3336;
  padding: 5px 9px;
  border-radius: 2px;
  font-size: 14px;
  color: #fff;
  margin: 5px;
  display: inline-block;
}

@media screen and (max-width: 920px){
  .b-articles{
    width: 100%;
    padding-left: 40px;
  }
  .b-release
  {
      width: 100%
  }
  .home-container{
    display: block;
  }

}
</style>
