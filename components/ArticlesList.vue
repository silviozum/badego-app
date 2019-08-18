<template>
  <div class="articles-list">
  <!-- <div class="content-articles" v-for="item in article">
    <nuxt-link :to="{name: 'article-id', params: { id:item.id } }" class="article-width">
    <a-card >
      <img
        alt="example"
        :src="item.data.imgRelated.mapValue.fields.url.stringValue"
        slot="cover"
      />

      <h2> {{item.data.title.stringValue}}</h2>
      <Categories  :tags="item.data.tags"/>
      <div class="footer-article">
        <Author :author="item.data.author"/>
        <SocialShare :item="item.data" />
      </div>
    </a-card>
    </nuxt-link>
  </div> -->
  <div class="content-article-release">
    <div class="article-release" v-for="(item,index) in article" v-if="index === 5">

    <nuxt-link :to="{name: 'article-id', params: { id:item.id } }" class="to-release"
     :style="{ backgroundImage: 'url(\'' + item.data.imgRelated.mapValue.fields.url.stringValue + '\')' }">
          <h2> {{item.data.title.stringValue}}</h2>
      </nuxt-link>
    </div>
  </div>

</div>
</template>

<script>
import Categories from './Categories'
import Author from './Author'
import SocialShare from './SocialShare'
export default {
  name:'ArticlesList',
  props:['article'],
  data () {
    return {
      loading:true
    }
  },
  computed:{
    url(){
      return window.location.href
    }
  },
  components:{
    Categories,Author,SocialShare
  }
}
</script>

<style>
body{
  background-color: #393e3c;

}
.to-release{
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  width: 100%;
  height: 600px;
  position: relative;
  background-position: center;
}
/* background-image: linear-gradient(180deg,
  rgba(0,0,0,.8) 0,
  transparent 50%,
  transparent 50%,
  rgba(0,0,0,.8)); */
.to-release:after{
  content: '';
background-image: linear-gradient(
  rgba(57,60,62,.9) 0,
  transparent 50%,
  rgb(57,60,62));
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
z-index: 2;
will-change: transform;
}
.to-release h2{
  color: #fff;
  position: absolute;
  bottom: 0;
  font-size: 43px;
  text-shadow: 2px 2px #0000;
  font-weight: bold;
  letter-spacing: -0.05em !important;
  text-shadow: 0px 0px 20px #393c2e;
  z-index: 100;
  margin: 0;
  padding: 18px;
}
.content-articles{
  margin-top: 40px;
  width: 50%;
  display: inline-block;
  vertical-align: top;

}
.article-width{
  border:0;
}

.content-articles .ant-card{
  font-family: 'Droid Serif', serif;
  border: 0;
}
.content-articles h2{
  font-weight: bold;
  font-size: 18px;
}
.content-articles .ant-card-body {
  padding: 15px 25px;
}

.footer-article{
  margin-top: 10px;
  display: flex;
  border-top: 1px solid #e0e0e0;
  height: 40px;
  line-height: 40px;
}
.footer-article .author{
  width: 50%;
}


@media(max-width:768px){
  .content-articles .ant-card-body {
    padding: 15px 15px;
  }
  .articles-list{
    display: block;
  }
  .content-articles{
    width: 100%;
    display: block;
  }
}
</style>
