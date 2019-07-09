<template>
  <div>
    <Header/>
    <Sidebar v-show="menu.openMenu"/>
    <nuxt />
  </div>
</template>
<script>
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
export default{

  data(){
    return{

    }
  },
  computed:{
    menu(){
      let item = this.$store.getters['menu/getMenu'];
      return item;
    }
  },
  components:{
    Header,
    Sidebar
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
.content-articles{
  display: flex;
}
.article-width{
  width:100%;
  border:0;
}
</style>
