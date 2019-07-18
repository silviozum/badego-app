<template>
  <div class="container">
    <ArticlesList :article="this.getArticles" />
  </div>
</template>

<script>
import ArticlesList from '../components/ArticlesList'
import { articleService } from '../services'
export default {
  data () {
    return {
      title: 'Hello World!',
      getArticles: ''
    }
  },
  head () {
    return {
      title: 'Badego'
    }
  },
  components:{ArticlesList},

  async beforeCreate(){
    const published = await articleService.list()
    this.getArticles = published
  }
}
</script>

<style>

</style>
