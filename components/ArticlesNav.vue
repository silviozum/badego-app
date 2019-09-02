<template>

<div class="contain">
      <div class="title-site"><h2>lançamentos</h2></div>
  <div class="row">
    <carousel class="row__inner" :perPageCustom="[[480, 1],[768, 3], [1024, 4]]" :paginationEnabled="false">
      <slide class="tile" v-for="item in article">
        <div class="tile__media">
          <img class="tile__img" :src="item.data.imgRelated.mapValue.fields.url.stringValue " alt=""  />
        </div>
        <div class="tile__details">
          <div class="tile__title">
            Top Gear
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</div>
</template>

<script>

import Categories from './Categories'
import Author from './Author'
import SocialShare from './SocialShare'
import { Carousel, Slide } from 'vue-carousel';

export default {
  name:'ArticleNav',
  props:['article'],
  data () {
    return {
      loading:true,
      isActive:false
    }
  },
  methods:{
    activeItem(){
      this.activeItem = true
    },
    downItem(){
      this.activeItem = false
    }
  },
  created(){
    console.log(this.article)
    console.log(this.activeItemArticle)
  },
  components:{
    Categories,Author,SocialShare,Carousel,Slide
  }
}
</script>

<style>
.articles-nav{
  padding: 0 40px;
  height: 250px;
}
.row {
  overflow: scroll;
  width: 100%;
}


.contain {
  width: 100%;
  position: relative;
}
.contain .title-site{
  position: absolute;
  top: 0;
}
.row {
  overflow: hidden;
  width: 100%;
  padding:  0 40px;
}
.row__inner .VueCarousel-slide{
  flex-basis: auto;
}
.row__inner .VueCarousel-wrapper{
  overflow: inherit;
}
.row__inner {
  transition: 450ms -webkit-transform;
  transition: 450ms transform;
  transition: 450ms transform, 450ms -webkit-transform;
  font-size: 0;
  white-space: nowrap;
  margin: 50px 0;
  padding-bottom: 10px;
}
.tile {
  position: relative;
  display: inline-block;
  width:290px;
  height: 202px;
  margin-right:5px;
  font-size: 20px;
  cursor: pointer;
  transition: 450ms all;
  -webkit-transform-origin: center left;
          transform-origin: center left;
}
.tile__img {
  width: 290px;
  height: 202px;
  -o-object-fit: cover;
     object-fit: cover;
}
.tile__details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  font-size: 10px;
  opacity: 0;

  transition: 450ms opacity;
}
.tile__details:after,
.tile__details:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: #000;
}
.tile__details:after {

}
.tile__details:before {

}
.tile:hover .tile__details {
  opacity: 1;
}
.tile__title {
  position: absolute;
  bottom: 0;
  padding: 10px;
}
.row__inner:hover {
  -webkit-transform: translate3d(-52.5px, 0, 0);
          transform: translate3d(-52.5px, 0, 0);
}
.row__inner:hover .tile {
  /* opacity: 0.3; */
}
.row__inner:hover .tile:hover {
  -webkit-transform: scale(1.344);
          transform: scale(1.344);
  opacity: 1;
}
.tile:hover ~ .tile {
  -webkit-transform: translate3d(100px, 0, 0);
          transform: translate3d(100px, 0, 0);
}



</style>
