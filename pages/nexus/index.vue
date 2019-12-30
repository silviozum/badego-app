<template>
<div class="nexus">
  <div class="section-nexus">
    <nav>
      <li>
        <nuxt-link to="/nexus/post">Publicar Materia</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/nexus/video">Publicar Video</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/nexus/podcast">Publicar Podcast</nuxt-link>
      </li>
      <li>
      <nuxt-link to="/nexus/serie">Publicar Serie</nuxt-link>
    </li>
    </nav>
  </div>

</div>
</template>

<script>
import { articleService } from '../../services'
import Author from '../../components/Author'
import Comments from '../../components/Comments'
export default {
  data () {
    return {
      files: []
    }
  },

}
</script>

<style>
.nexus{
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 10%;
  text-align: center;
}
.section-nexus nav li{
  height: 80px;
  line-height: 80px;
  margin-bottom: 10px;
  border: 2px solid #eee
}
</style>
