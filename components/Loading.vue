<template>
  <div class="content-loading" :style="{ backgroundImage:  'url(\'' + thatGif + '\')' }" >
  </div>
</template>

<script>

export default {

  data () {
    return {
      gif: [
      'https://firebasestorage.googleapis.com/v0/b/badego-cc1ba.appspot.com/o/gifs%2Fload1-low.gif?alt=media&token=ecb1568e-e869-4909-956a-d9ff65b0e098',
      'https://firebasestorage.googleapis.com/v0/b/badego-cc1ba.appspot.com/o/gifs%2Fload2-low.gif?alt=media&token=98a64bdd-65cf-402b-9e42-c1acdab9afce',
      'https://firebasestorage.googleapis.com/v0/b/badego-cc1ba.appspot.com/o/gifs%2Fload3-low.gif?alt=media&token=376ec1eb-cedd-45e4-a271-48a4ff4cc0bf'
      ]
    }
  },
  computed:{
    thatGif(){
       return  this.gif[Math.floor(Math.random()*this.gif.length)];
    }
  }

}
</script>

<style>
.content-loading{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999999;
  text-align: center;
  background-size: cover;
  background-position: center;
}
.content-loading img{
  width: 79% !important;
}

</style>
