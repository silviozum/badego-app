<template>
  <div class="container">

    <div v-html="post"></div>
  </div>
</template>

<script>
import { articleService } from '../../services'

export default {
  data () {
    return {
      title: 'Hello World!',
      post:  ''
    }
  },
  async beforeCreate(){
    const item = await articleService.article(this.$route.params.id)
    this.post = item.editorData.stringValue
    let embed =  this.post.match(/\bhttps?:\/\/\S+/gi);
    if(item){
      const related = await articleService.related(item.tags)
    }


  }
}
</script>

<style>

</style>
