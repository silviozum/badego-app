<template>
  <div class="articles-list">

  <div class="content-article-release">
    <div class="article-release" v-for="(item,index) in article" >
      <div v-if="index === 0 && where !=='article'" >
          <nuxt-link :to="{name: 'article-id', params: { id:item.id } }" class="to-release"
          :style="{ backgroundImage: 'url(\'' + item.data.imgRelated.mapValue.fields.url.stringValue + '\')' }">
            <h2> {{item.data.title.stringValue}}</h2>
        </nuxt-link>
        <div class="footer-release">
          <div class="left-footer-release">
            <Author :author="item.data.author" :dateRelease="item.data.createdAt.timestampValue"/>
          </div>
          <SocialShare :item="item.data" />
        </div>
      </div>
      <span class="title-section" v-if="index === 0">leia também</span>
      <div class="list-articles"  v-if="index > 0 && index < 4">
        <nuxt-link :to="{name: 'article-id', params: { id:item.id } }" class="article-width">
        <a-card >
          <div class="content-image-article"
          :style="{ backgroundImage: 'url(\'' + item.data.imgRelated.mapValue.fields.url.stringValue + '\')' }">
        </div>
        <div class="content-article-infos">
          <h3> {{item.data.title.stringValue}}</h3>
          <!-- <Categories  :tags="item.data.tags"/> -->
          <!-- <span class="post-minutman">mais lidos</span> -->
          <span class="post-minutman">leia também</span>
        </div>
        </a-card>
        </nuxt-link>
      </div>
    </div>
  </div>
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

</div>
</template>

<script>
import Categories from './Categories'
import Author from './Author'
import SocialShare from './SocialShare'
export default {
  name:'ArticlesList',
  props:['article', 'where'],
  data () {
    return {
      loading:true
    }
  },
  components:{
    Categories,Author,SocialShare
  }
}
</script>

<style>

.to-release{
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  width: 100%;
  height: 550px;
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
  rgba(37,41,44,.9) 0,
  transparent 50%,
  rgb(37,41,44));
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
  z-index: 99;
  margin: 0;
  padding: 18px;
}
.footer-release{
  display: flex;
  padding: 12px;
}
.left-footer-release{
  width: 50%;
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

.list-articles .ant-card{
  font-family: 'Droid Serif', serif;
  border: 0;
  background-color: #25292c;
}

.list-articles h3{
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  line-height: 23px;
  letter-spacing: -0.8px;
  margin: 0;
}
.list-articles .content-image-article{
  width: 112px;
  height: 112px;
  background-image: url(https://ucarecdn.com/d3166c3d-185f-4d77-ac19-33c435cb085e/);
background-size: cover;
background-position: center;
display: inline-block;
margin-right: 12px
}
.list-articles .content-image-article img{
  width: 100%;
}
.list-articles .ant-card-body{
  display: flex;
  padding: 12px;
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
.title-section{
  font-size: 42px;
  color: #fff;
  letter-spacing: -0.8px;
  margin-left: 12px;
  margin-top: 50px;
  display: block;
  font-weight: bold;
}
.content-article-infos{
    width: 62%;
    display: inline-block;
}
.post-minutman{
  display: block;
  color:#93999d;
  font-size: 13px;
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
