<template>
  <div>
    <section class="user-banner" :style="{ backgroundImage:  'url(\'' + thatGif + '\')' }" ></section>
      <div class="content-user-analytics" v-if="articles">
      <div class="user-info">
        <div class="bg-col"></div>
        <img :src="profile.photo" width="200px">
        <span class="user-name">{{profile.name}}</span>
        <div class="home-tags">
          <nav>
            <li v-for="(item,key) in tags">
              <nuxt-link :to="{name: 'article-tags-id', params: { id:key } }">{{key}}</nuxt-link>
            </li>
          </nav>
        </div>
      </div>
      <div class="content-user-articles">
        <div v-for="item in articles" v-if="articles" class="user-articles">
          <div class="user-article-col1">
              <img :src="item.data.author.photo">
          </div>
          <div class="user-article-col2">
            <div class="header-user-article">
              <span class="author-name">{{item.data.author.name}}</span>
              <span>{{item.data.createdAt.timestampValue}}</span>
            </div>
            <div class="name-user-article">
            <nuxt-link :to="'/article/'+item.id">
              <img :src="item.data.imgRelated">
              <h2>{{item.data.title}}</h2>
            </nuxt-link>
            <div class="home-tags">
              <nav>
                <li v-for="item in item.data.tags">
                  <nuxt-link :to="{name: 'article-tags-id', params: { id:item } }">{{item}}</nuxt-link>

                </li>
              </nav>
            </div>

            <div v-if="user.uid === id" class="article-settings">
              <nuxt-link :to="'/post/'+item.id"><i class="zwicon-edit-square"></i></nuxt-link>
              <button v-on:click="deleteArticle(item.id)"><i class="zwicon-close-square"></i></button>
            </div>
          </div>
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
      tags:[],
      profile:'',
      gif: [
        'https://firebasestorage.googleapis.com/v0/b/badego-cc1ba.appspot.com/o/gifs%2Fgifss1.gif?alt=media&token=e4ce5b8d-7484-4977-aa43-5a7278031144',
        'https://firebasestorage.googleapis.com/v0/b/badego-cc1ba.appspot.com/o/gifs%2Fgifss2.gif?alt=media&token=5b7e716a-5ef0-42d7-ab6d-a28c85166be3',
        'https://firebasestorage.googleapis.com/v0/b/badego-cc1ba.appspot.com/o/gifs%2Fgifss3.gif?alt=media&token=498b2f0a-4b5f-4e57-98e6-239d9ed395e6',
        'https://firebasestorage.googleapis.com/v0/b/badego-cc1ba.appspot.com/o/gifs%2Fgifss4.gif?alt=media&token=32caa799-0378-4e5f-a260-b61bcfb5e01f',
        'https://firebasestorage.googleapis.com/v0/b/badego-cc1ba.appspot.com/o/gifs%2Fgifss5.gif?alt=media&token=009c7efd-0f5a-4cda-ac2e-5ed8bbc98bdc',
        'https://firebasestorage.googleapis.com/v0/b/badego-cc1ba.appspot.com/o/gifs%2Fgifss6.gif?alt=media&token=c5da036a-3fdf-4ee6-86d1-e85550579e86',
        'https://firebasestorage.googleapis.com/v0/b/badego-cc1ba.appspot.com/o/gifs%2Fgifss7.gif?alt=media&token=f0ed29e7-011c-4940-9932-2cdb54917faf',
        'https://firebasestorage.googleapis.com/v0/b/badego-cc1ba.appspot.com/o/gifs%2Fgifss8.gif?alt=media&token=4d22ce64-7ade-42a4-8cbf-7b36f23160ed',
        'https://firebasestorage.googleapis.com/v0/b/badego-cc1ba.appspot.com/o/gifs%2Fgifss9.gif?alt=media&token=81a5aa98-7c53-49a4-83a9-a21ef75594f6',
        '',
      ]
    }
  },

  computed: {

      thatGif(){
         return  this.gif[Math.floor(Math.random()*this.gif.length)];
      },

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
      this.profile = articles[0].data.author
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
  background-position: center center;
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
.user-article-col1{
  display: inline-block;
  width: 8%;
  margin-left: 18px;
  vertical-align: top;
}
.user-article-col2{
  display: inline-block;
  width: 70%;
}
.user-article-col1 img{
  width: 50px;
  border-radius: 50%;
}
.user-articles{
  border-bottom: 1px solid #1a1d1f;
  margin-bottom: 20px;
  padding: 10px 0;
  justify-content: space-between;
}
.user-articles a img{
  width: 100%;
  margin-top: 6px;
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
.header-user-article .author-name{
  color: #de8145;
  font-weight: bold;
  font-size: 15px;
}
.name-user-article h2{
  color: #fff;
  margin-top: 8px;
  display: block;
  font-size: 24px;
  font-weight: bold;
}
.article-settings{
  text-align: right;
}
.article-settings i{
  color: #93999d;
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
