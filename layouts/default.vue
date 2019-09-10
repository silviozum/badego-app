<template>
  <div :class="theme">
    <Header v-if="user.logged"/>
    <div class="connect" v-if="!user.logged">
      <span class="title-blog">badego</span>
        <Connect />
      <img src="../static/favicon.gif">
    </div>
    <nuxt v-if="user.logged"/>
  </div>
</template>
<script>
import Header from '../components/Header'

import Connect from '../components/Connect'
export default{

  data(){
    return{

    }
  },
  computed:{
    user(){
      let getUser = this.$store.getters['user/getUser'];
      return getUser
    },
    theme(){
      const qs = this.$store.getters['user/getTheme']
      return qs
    }

  },
  mounted() {
    this.$store.commit('user/userLogged');
  },
  components:{
    Header,
    Connect
  },

}
</script>
<style>
@import '../assets/css/ligth.css';
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body{
  font-family: 'Droid Serif', serif !important;
  font-size: 16px;
  word-spacing: 1px;
  background-color: #25292c;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
li{
  list-style: none;
}
.ant-btn-ghost:hover{
  border-color: transparent;
}
a:hover{
  color: #de8145;
}
a:active,a:focus{
  text-decoration: none !important;
}
.container{
  max-width: 1440px;
  margin: 0 auto;
}
a, i{
  text-decoration: none;
  color: #fff;
}
.ligth a{
  coor:#282828;
}
div{color: #fff}
.connect{
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  padding-top: 6%;
}
.connect .title-blog{
  display: block;
  font-size: 50px;
  margin-bottom: 20px;
}
.connect img{
  width: 100%;
  margin-top: 20px;
}

</style>
