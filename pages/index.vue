<template>
  <div class="container">
    <ArticlesList />
  </div>
</template>

<script>
import ArticlesList from '../components/ArticlesList'
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
  components:{ArticlesList}
}
</script>

<style>

</style>
