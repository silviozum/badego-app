
<template>
  <div class="content-release">
      <nuxt-link :to="{name: 'article-id', params: { id:item.id } }" class="to-release"
      v-if="item.data.type.stringValue === 'article'"
        :style="{ backgroundImage: 'url(\'' + item.data.imgRelated.stringValue + '\')' }">
          <h2> {{item.data.title.stringValue}}</h2>
      </nuxt-link>

      <nuxt-link :to="{name: 'article-id', params: { id:item.id } }" class="to-release"
      v-if="item.data.type.stringValue === 'video'">
        <video autoplay muted loop width="100%" height="550" class="video-release">
          <source :src="item.data.videoRelated.stringValue" type="video/mp4">
        </video>
          <h2> {{item.data.title.stringValue}}</h2>
      </nuxt-link>

      <div class="footer-release">
        <div class="left-footer-release">
          <Author :author="item.data.author" :dateRelease="item.data.createdAt.timestampValue"/>
        </div>
        <SocialShare :item="item.data" />
      </div>
    </div>

</template>

<script>
import ArticlesList from '../components/ArticlesList'
import { articleService } from '../services'
import Author from '../components/Author'
import SocialShare from '../components/SocialShare'

export default {
  props:['item'],
  components:{ArticlesList, Author, SocialShare},

}
</script>

<style>
.to-release{
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  width: 100%;
  height: calc(100vh - 20px);
  position: relative;
  background-position: center;
}

.to-release:after{
  content: '';
  background-image: url('../static/shadow_dark.png');
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 102% 102%;
  background-repeat: no-repeat;
  left: 0px;
}
.to-release h2{
  color: #fff;
  position: absolute;
  bottom: 0;
  font-size: 40px;
  line-height: 51px;
  text-shadow: 2px 2px #0000;
  font-weight: bold;
  letter-spacing: -0.05em !important;
  /* text-shadow: 0px 0px 20px #393c2e; */
  z-index: 99;
  margin: 0;
  padding: 0 40px;
}
.video-release{
  position: absolute;
}
.footer-release{
  display: flex;
  padding: 8px 0;
}
.left-footer-release{
  width: 40%;
}
@media screen and (max-width: 480px){
  .to-release h2{
    font-size: 30px;
    line-height: 42px;
  }
}
</style>
