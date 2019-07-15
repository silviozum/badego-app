<template>
  <div class="container">
    <ArticlesList :article="this.getArticles" />
    {{getArticles}}cad
  </div>
</template>

<script>
import ArticlesList from '../../components/ArticlesList'
import { userService } from '../../services'
export default {
  data () {
    return {
      title: 'Hello World!'
    }
  },
  head () {
    return {
      title: 'Badego'
    }
  },
  components:{ArticlesList},
  computed:{
    async getArticles(){
      const publish = await userService.getArticles()
      console.log(publish)
    }
  }
}
</script>

<style>

</style>
