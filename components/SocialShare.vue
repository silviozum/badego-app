<template>

  <div class="share-article">

    <social-sharing
              :url="url"
               :title="item.title.stringValue"
               quote="Para ninguem"
               twitter-user="badeguinho"
               inline-template>
               <div>
    <network network="twitter">
      <a-icon type="twitter" class="twitter-icon"/>
    </network>
    <network network="facebook">
    <a-icon type="facebook" class="facebook-icon"/>

    </network>

  </div>

    </social-sharing>
  </div>

</template>

<script>

export default {
  name:'SocialShare',
  props:['item'],
  data () {
    return {
      loading:true
    }
  },
  computed:{
    url(){
      // return window.location
      return 'vai'
    }
  }
}
</script>

<style>

.share-article{
  width: 100%;
  padding-top: 6px;
  display: block;
  justify-content: flex-end;
}
.share-article i{
  font-size: 14px;
  border-radius: 50px;
  border: 1px solid #414548;
  padding: 5px;
  box-sizing: border-box;
}
 .anticon{
   color: #fff;
   font-size: 26px;
 }
/* .share-article i{
  color: #de8145;
  width: 42px;
  height: 42px;
  background-image: url('../static/sprite_icons.png');
  display: block;
} */

i.like-icon{color:#0000 }
i.like-icon:hover{color:#3ad0cf;}
i.dislike-icon{}
i.dislike-icon:hover{}
i.comments-icon{}
i.comments-icon:hover{}
i.save-icon{}
i.save-icon:hover{}


i.snapchat-icon{}
i.snapchat-icon:hover
i.whatsapp-icon{}
i.whatsapp-icon:hover{}
i.youtube-icon{}
i.youtube-icon:hover{}
i.twitter-icon{color:#de8145}
i.twitter-icon:hover{color:#00b8eb}



i.facebook-icon{color:#de8145}
i.facebook-icon:hover{color:#1d5a9e}

i.instagram-icon{}

i.pinterest-icon{}
i.tumblr-icon{}




/* i.like-icon{
    background-position: 0px 0px;
}
i.like-icon:hover{
    background-position: 0px 42px;
}
i.dislike-icon{
    background-position: 42px 0px;
}
i.dislike-icon:hover{
    background-position: 42px 42px;
}
i.comments-icon{
    background-position: 84px 0px;
}
i.comments-icon:hover{
    background-position: 84px 42px;
}
i.save-icon{
    background-position: 126px 0px;
}
i.save-icon:hover{
    background-position: 126px -42px;
}


i.snapchat-icon{
  background-position: 0px 168px;
}
i.snapchat-icon:hover{
  background-position: 0px 127px;
}
i.whatsapp-icon{
  background-position: 42px 168px;
}
i.whatsapp-icon:hover{
  background-position: 42px 127px;
}
i.youtube-icon{
  background-position: 84px 168px;
}
i.youtube-icon:hover{
  background-position: 84px 127px;
}
i.twitter-icon{

  background-position: 126px 168px;
}
i.twitter-icon:hover{
  background-position: 126px 127px;
}



i.facebook-icon{
    background-position:
}

i.instagram-icon{
    background-position:
}

i.pinterest-icon{
    background-position:
}
i.tumblr-icon{
    background-position:
} */



</style>
