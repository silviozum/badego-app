<template>
  <div>
    <Header v-if="user.logged"/>
    <div class="connect" v-if="!user.logged">
      <span class="title-blog">badego</span>
        <Connect />
      <img src="../static/favicon.gif">
    </div>
    <Sidebar v-show="menu.openMenu"/>
    <nuxt v-if="user.logged"/>
  </div>
</template>
<script>
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Connect from '../components/Connect'
export default{

  data(){
    return{

    }
  },
  computed:{
    menu(){
      let item = this.$store.getters['menu/getMenu'];
      return item;
    },
    user(){
      let getUser = this.$store.getters['user/getUser'];
      console.log(getUser)
      return getUser;
    }
  },
  components:{
    Header,
    Sidebar,
    Connect
  },

}
</script>
<style>
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
.container{
  max-width: 1440px;
  margin: 0 auto;
}
a, i{
  color: #282828;
}
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
