<template>
  <div>

  <div class="header">
    <div class="content-title-site">
      <div class="title-site">
        <h1><nuxt-link to="/" class="title-blog">badego</nuxt-link></h1>
      </div>
    </div>
    <div class="content-open-menu" @click="open" v-click-outside="hide">
    <div class="open-menu">
      <button  v-if="user.photo">
        <img :src="user.photo">
      </button>
    </div>
    <div v-if="headerMenu">
      <Menu />
    </div>
  </div>
  </div>
</div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import { userService } from '../services'
import Menu from './Menu'
export default {
  name: 'Header',

  computed:{
    user(){
      const item  = this.$store.getters['user/getUser'];
      return item
    },
    headerMenu(){
      const item  = this.$store.getters['user/getMenuState'];
      return item
    }
  },
  methods:{
    open(){
      this.$store.commit('user/openMenuUser', true)
    },
    hide(){
      this.$store.commit('user/openMenuUser', false)
    },

  },

  directives: {
    ClickOutside
  },
  components:{
    Menu
  }
}
</script>

<style>

.title-site{
  font-size: 42px;
  color: #fff;
  letter-spacing: -0.8px;
  display: block;
  font-weight: bold;
}

.title-site h2,.title-site h1{
  color: #fff;
  font-weight: bold;
  font-size: 22px;
  letter-spacing: -0.8px;
    padding-top: 10px;
}
.header{
  padding: 15px 160px;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 0;
  z-index: 100
}
.header .ant-row .ant-col-8:nth-child(2){
  text-align: center;
}
.header .ant-row .ant-col-8:nth-child(3){
  text-align: right;
}
.title-blog{
  font-weight: 600;
  font-size: 20px;
  text-shadow: 0px 0px 60px #25292c;
}
.open-menu button{
  font-size: 18px;
  outline: none;
  cursor: pointer;
}

.open-menu button{
  border:none;
  background-color: transparent;
}
.open-menu img{
  width:38px;
  height: 38px;
  border-radius: 50px;
}
.header-menu{
  padding:  22px;
  border-bottom: 1px solid #3c4449;
}
.header-menu a{
  display: flex;
}
.header-menu span{
  margin-left: 10px;
  color: #fff;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;

  align-items: center;
  color: #fff;
}
.header-menu img{
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

@media screen and(max-width:980px){
  .header{
    bottom: 0;
    top: auto;
  }

}
</style>
