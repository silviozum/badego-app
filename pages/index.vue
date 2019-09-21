<template>
  <div v-if="this.getArticles">
  <div class="home-container">
    <div class="b-release">
      <Release :item="item" v-if="item" />
    </div>
    <div class="b-articles">
      <ArticlesList :article="trendings" class="list-articles"/>
      <div class="home-tags">
        <div class="title-site"><h2>tags</h2></div>
        <nav>
          <li v-for="(item,key,index) in tags">
            <nuxt-link :to="{name: 'article-tags-id', params: { id:key } }">{{key}} <span>({{item}})</span></nuxt-link>
          </li>
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

  },
  computed:{
    item(){
      return this.getArticles[0]
    },
    trendings(){
      const getTrendings = []
      const list = this.getArticles.forEach(function(item,index){
        if(index < 4 && index >= 1){ //because index 1 go to release
          getTrendings.push(item)
        }
      })
      return getTrendings
    }
  },
  components:{
    ArticlesList,
    Author,
    SocialShare,
    Release,
    ArticlesNav
  },

  async created(){
      const published = await articleService.list()
      if(published.length > 0){
         this.getArticles = published
      }
      const getTags = await articleService.tags()
      this.tags = getTags
      let come = this.getArticles.map(function(item){
        return item.data.tags
      })
      this.tags = come.filter(function(item){
          return item.arrayValue
      })
      let auxTag = []
      come = this.tags.map(function(item){
        item.arrayValue.values.filter(function(i){
          auxTag.push(i.stringValue)
        })
      })
      auxTag = Object.assign({},[auxTag])
    
      const getSumTags = obj => {
          const arrayOfTags = Object.values(obj);
          return arrayOfTags.reduce(
              (acc, tags) => {
                  tags.forEach(tag => {
                      if (!acc.hasOwnProperty(tag)) {
                          acc[tag] = 0
                      }
                      acc[tag] += 1
                  })
                  return acc
              },
              {}
          );
      };
    this.tags = getSumTags(auxTag)
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
.home-tags nav li span{
  font-size: 10px;
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
