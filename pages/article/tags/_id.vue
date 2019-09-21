<template>
  <div>
    {{tagName}}
    <ArticlesList :article="articles" class="list-articles"/>
  </div>
</template>

<script>
import ArticlesList from '../../../components/ArticlesList'
import { articleService } from '../../../services'
export default {
  data(){
    return {
      articles: ''
    }
  },
  components:{
    ArticlesList
  },
  computed:{
    tagName(){
      return this.$route.params.id
    }
  },
  async mounted(){
    const getArticles = await articleService.articleTag(this.$route.params.id)
    console.log(getArticles)
    this.articles = getArticles
  }
}
</script>

<style>

</style>
