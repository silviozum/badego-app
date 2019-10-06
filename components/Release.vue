
<template>
  <div class="content-release">
    <div v-for="(item, index) in trendings" v-if="index === slide" >
      <nuxt-link :to="{name: 'article-id', params: { id:item.id } }" class="to-release animated fast fadeIn"
      v-if="item.data.type.stringValue === 'article'"
        :style="{ backgroundImage: 'url(\'' + item.data.imgRelated.stringValue + '\')' }">
          <h2> {{item.data.title.stringValue}}</h2>
      </nuxt-link>

      <nuxt-link :to="{name: 'article-id', params: { id:item.id } }" class="to-release content-video-release"
      v-if="item.data.type.stringValue === 'video'">
        <video autoplay muted loop class="video-release">
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
    <div class="nav-authors">
      <nav>
        <li v-for="(item, index) in trendings"
        v-on:click="slide = index"
        :class="{'slide-selected': index === slide}">
          <img :src="item.data.author.mapValue.fields.photo.stringValue">
          <div>
            <span>{{item.data.author.mapValue.fields.name.stringValue}}</span>
            <p class="date-release">{{item.data.createdAt.timestampValue| moment("from", "now", true)}}</p>
          </div>
        </li>
      </nav>
    </div>
  </div>

</template>

<script>
import ArticlesList from '../components/ArticlesList'
import { articleService } from '../services'
import Author from '../components/Author'
import SocialShare from '../components/SocialShare'

export default {
  props:['trendings'],
  data(){
    return {
      slide:0
    }
  },
  components:{ArticlesList, Author, SocialShare},

}
</script>

<style>
.to-release{
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  width: 100%;
  height: calc(100vh - 100px);
  position: relative;
  background-position: center;
}

.to-release:after{
  content: '';
  position: absolute;
  width: 100%;
  background-image: url('../static/mask_banner_dark.png');
  background-position: bottom;
  background-repeat:repeat-x;
  height: 100%;
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
.content-video-release{
  overflow: hidden;
}
.video-release{
  position: absolute;
    left: 0;
    top: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -1000;
}
.footer-release{
  display: flex;
  padding: 8px 0;
}
.left-footer-release{
  width: 40%;
}
.nav-authors{
  position: absolute;
  bottom:200px;
  left: 40px;
}
.nav-authors li {
  width:170px;
  cursor: pointer;
  padding: 5px;
  background-color: #fff;
  border-radius: 50px;
  display: inline-block;
  margin-right: 12px;
  height: 50px;
  opacity: 0.4;
  box-sizing: border-box;
}
.slide-selected{
  opacity: 1 !important;
}
.nav-authors li:hover{
  opacity: 1;
}
.nav-authors li div{
  display: inline-block;
  line-height: 17px;
  margin-top: 3px;
}
.nav-authors li img{
  border-radius: 100px;
  width: 40px;
  display: inline-block;
  vertical-align: top;
}
.nav-authors .date-release{
  color:#6e6e74;
  font-size: 10px;
}
.nav-authors li span{
  color: #de8145;
  font-size: 14px;
  font-weight: bold;
  width: 114px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media screen and (max-width: 480px){
  .to-release h2{
    font-size: 30px;
    line-height: 42px;
  }
}
</style>
