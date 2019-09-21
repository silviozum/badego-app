<template>
  <div>
    <section class="user-banner" style="background-image:url('https://www.morrisonhotelgallery.com/images/big/The%20Talking%20Heads%201980%2004.jpg')"></section>
      <div class="content-user-analytics">
      <div class="user-info">
        <div class="bg-col"></div>
        <img :src="user.photo" width="200px">
        <span class="user-name">{{user.name}}</span>
        <!-- <span>{{user.email}}</span> -->
        <div class="home-tags">
          <nav>
            <li v-for="(item,key,index) in tags">
              <nuxt-link :to="{name: 'article-tags-id', params: { id:key } }">{{key}} <span>({{item}})</span></nuxt-link>
            </li>
          </nav>
        </div>
      </div>
      <div class="content-user-articles">
        <div v-for="item in articles" v-if="articles" class="user-articles">
          <nuxt-link :to="'/article/'+item.id">
            <img :src="item.data.imgRelated">
            {{item.data.title}}
          </nuxt-link>

          <div v-if="user.uid === id">
            <nuxt-link :to="'/post/'+item.id">Editar</nuxt-link>
            <button v-on:click="deleteArticle(item.id)">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userService } from '../../services'
import moment from 'moment'
export default {
  data () {
    return {
      articles:[],
      tags:[]
    }
  },

  computed: {
    user(){
    const user = this.$store.getters['user/getUser'];
      return user

    },
    id(){
      return this.$route.params.id
    }
  },

  methods:{
    async deleteArticle(id){
      const article = await userService.deleteArticle(id)
      this.articles = this.articles.filter(function(item){ return item.id !== id})
    }
  },
  async mounted(){
    const articles = await userService.userArticles(this.id)

    if(articles.length > 0){
      this.articles = articles
      let tags = articles.map(function(item){

            return item.data.tags

      })

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
     this.tags = getSumTags(tags)
    }
      this.$store.commit('user/openMenuUser', false)
  },
}
</script>

<style>
.user-banner{
  height: 320px;
  width: 100%;
  background-size: cover;
  background-position: center top;
    background-attachment: fixed;
}
.content-user-analytics{
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.bg-col{
  position:absolute;
  right:0;
  left:-400%;
  width:500%;
  height: 100%;
  z-index:-1;
  background-color: #222528;
}

.user-info{
  width: 30%;
  position: relative;
  text-align: center;
  padding: 12px;
  box-sizing: border-box;
  padding-top: 0;
}
.user-info img{
  border-radius: 50%;
  margin-top: -100px;
}
.user-info .user-name{
  display: block;
  font-size: 20px;
  margin-top: 30px;
  font-weight: bold;
}
.content-user-articles{
  margin-top: 50px;
  width: 70%;
}
.user-articles{
  border-bottom: 1px solid #fff;
  margin-bottom: 20px;
  padding: 10px 0;
  justify-content: space-between;
}
.user-articles a img{
  width: 100%;
}
.content-user-articles button{
  display: inline-block;
  cursor: pointer;
  border: 0;
  background-color: transparent
}
.user-info .home-tags{
  text-align: left;
  margin-top: 30px;
}
@media screen and (max-width: 920px){
  .content-user-analytics{
    display: block;
    text-align: center;
  }
  .user-info{width: 100%}
  .content-user-articles{width: 100%}
}

</style>
