<template>
  <div class="articles-list">
  <div class="content-articles" v-for="item in article">
    <nuxt-link :to="{name: 'article-id', params: { id:item.id } }" class="article-width">
    <a-card >
      <img
        alt="example"
        :src="item.imgRelated.mapValue.fields.url.stringValue"
        slot="cover"
      />
      <h2> {{item.title.stringValue}}</h2>
      <Categories  :tags="item.tags"/>
      <div class="footer-article">
        <Author :author="item.author"/>
        <div class="share-article">
          <a href="#">
            <a-icon type="twitter" />
          </a>
          <a href="#">
            <a-icon type="facebook" />
          </a>
        </div>
      </div>
    </a-card>
    </nuxt-link>
  </div>

</div>
</template>

<script>
import Categories from './Categories'
import Author from './Author'
export default {
  name:'ArticlesList',
  props:['article'],
  data () {
    return {
      loading:true
    }
  },
  components:{
    Categories,Author
  }
}
</script>

<style>
.articles-list{
  justify-content: space-between;
  padding: 10px;
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
.share-article{
  text-align: right;
  width: 50%;
}
.share-article a{
  font-size: 18px;
  margin: 0 10px;

}
.share-article a i{
  color: #de8145;
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
