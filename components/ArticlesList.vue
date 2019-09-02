<template>
  <div class="articles-list">

  <div class="content-article-release">
      <div class="title-site"><h2> trendings</h2></div>
    <div class="article-release" v-for="(item,index) in article" >
      <div class="list-articles" v-if="index > 4">
        <nuxt-link :to="{name: 'article-id', params: { id:item.id } }" class="article-width">
        <a-card >
          <div class="content-image-article"
          :style="{ backgroundImage: 'url(\'' + item.data.imgRelated.mapValue.fields.url.stringValue + '\')' }">
        </div>
        <div class="content-article-infos">
          <div class="article-infos">
          <h3> {{item.data.title.stringValue}}</h3>
          <!-- <Categories  :tags="item.data.tags"/> -->
          <!-- <span class="post-minutman">mais lidos</span> -->
          <div class="footer-article-list">
            <!-- <span ><a-icon type="wifi" /></span> -->
            <span>6 ago</span>
            <span>1:44h de discussao</span>
          </div>
        </div>
        </div>
        </a-card>
        </nuxt-link>
      </div>
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
  props:['article', 'where'],
  data () {
    return {
      loading:true
    }
  },
  created(){
    console.log(this.article)
  },
  components:{
    Categories,Author,SocialShare
  }
}
</script>

<style>

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
background: none;
  margin-bottom: 12px;
  height: 116px;
}

.list-articles h3{
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  line-height: 27px;
  letter-spacing: -0.8px;
  margin: 0;
  overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
}
.list-articles .content-image-article{
  width: 116px;
  height: 116px;
  min-width : 116px;
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
  padding: 0;
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
.content-article-infos{
  display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;

	-ms-flex-align: center;
	-webkit-align-items: center;
	-webkit-box-align: center;

	align-items: center;

}
.article-infos{
display: block;
}
.footer-article-list{
  display: flex;
}
.footer-article-list i{
  font-size: 13px;
    color:#93999d;
}
.footer-article-list  span{
  display: block;
  color:#93999d;
  font-size: 13px;
  margin: 0 5px;
}

</style>
