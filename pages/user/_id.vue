<template>
  <div class="content-user-analytics">
    <!-- {{user.name}}
    {{user.email}}   -->

    <div v-for="item in articles" v-if="articles">
      <nuxt-link :to="'/article/'+item.id">{{item.data.title}}</nuxt-link>
      <div v-if="user.uid === id">
        <nuxt-link :to="'/post/'+item.id">editar</nuxt-link>
        <button v-on:click="edit()">Excluir</button>
      </div>

    </div>

  </div>
</template>

<script>
import { userService } from '../../services'
import moment from 'moment'
import ArticlesList from '../../components/ArticlesList'
export default {
  data () {
    return {
      articles:[],
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
  components:{
    ArticlesList
  },
  async mounted(){
    const articles = await userService.userArticles(this.id)

    if(articles.length > 0){
      this.articles = articles
    }
      console.log(this.articles)
  },
}
</script>

<style>
.content-user-analytics{
  padding-top: 200px;
}

</style>
