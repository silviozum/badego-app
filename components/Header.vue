<template>
  <div>
  <div class="content-title-site">
    <div class="title-site">
      <nuxt-link to="/" class="title-blog"><h1>badego</h1></nuxt-link>
    </div>
  </div>
  <div class="header">
    <div class="open-menu">

      <button  v-on:click="openMenu = !openMenu" v-if="user.photo">
        <img :src="user.photo">
      </button>
    </div>
    <div class="menu" v-if="openMenu">
      <div class="header-menu">
        <nuxt-link :to="'/user/'+user.uid" >
          <img :src="user.photo">
          <span>{{user.name}}</span>
        </nuxt-link>
      </div>
      <nav>
        <li><nuxt-link to="/">feed </nuxt-link></li>
        <li><nuxt-link to="/">Publicações</nuxt-link></li>
        <li class="menu-switch">Modo Escuro <a-switch  @change='onChange'/></li>
      </nav>
      <nav class="footer-menu">
        <li><nuxt-link to="/">Ajuda </nuxt-link></li>
        <li><nuxt-link to="/">Termos e Condições</nuxt-link></li>
        <li><a  v-on:click="logout()"  >Sair</a></li>

      </nav>
    </div>
  </div>
</div>
</template>

<script>
import { userService } from '../services'
export default {
  name: 'Header',
  data () {
    return {
      title: 'Hello World!',
      openMenu:false,
      disabledTheme:'',
    }
  },
  computed:{
    user(){
      const item  = this.$store.getters['user/getUser'];
      return item
    },
  },
  methods:{
    open(){
      this.$store.commit('menu/menuList', true)
    },
    onChange(checked){
      this.$store.commit('user/setTheme', checked)
    },
    async logout(){
      const logout = await userService.logout();
      this.$store.commit('user/logout')
        location.reload();
    }
  },
  mounted(){
    const theme =  this.$store.getters['user/getTheme'];

    if(theme === 'dark'){
      this.disabledTheme = false
    }else{
      this.disabledTheme = true
    }

  }
}
</script>

<style>
.content-title-site{
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 20;
  padding-left: 160px;
}
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
  text-align: right;
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
}
.open-menu button{
  font-size: 18px;
  outline: none;
  cursor: pointer;
}
.menu{
  background-color: #fff;
  position: absolute;
  width: 248px;
  border-radius: 3px;
  right: 55px;
  text-align: left;
  background-color: #2e3236;
  border: 1px solid #393f44;
  z-index: 50;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(19,21,23,.8);
-moz-box-shadow: 0px 0px 5px 0px rgba(19,21,23,.8);
box-shadow: 0px 0px 5px 0px rgba(19,21,23,.8);
top:73px;
}
.menu:before{
  position: absolute;
  content: '';
  -ms-transform: rotate(90deg); /* IE 9 */
-webkit-transform: rotate(90deg); /* Safari 3-8 */
transform: rotate(45deg);
  width:20px;
  height: 20px;
  background-color: #2e3236;
  border-top: 1px solid #393f44;
  border-left: 1px solid #393f44;
  border-radius: 3px;
  left: 108px;
  margin-left: top;
  top: -11px;
  z-index: 100;
}
.menu nav li{color: #fff;  font-size: 14px;}
.menu nav li a{
  color: #fff;
  font-weight: normal;
  font-size: 14px;
}
.menu li .ant-switch{
  height: 18px;
min-width: 34px;
top: 0;
}
.menu li .ant-switch:after{
  height: 16px;
  width: 16px;
  margin-left: 0;
  top: 0;
}
.menu nav li{

  margin-top: 11px;
  margin-bottom: 11px;
  display: block;
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
  display: flex;
  padding:  22px;
  border-bottom: 1px solid #3c4449;
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
.menu nav{
  padding: 30px 40px;
    border-bottom: 1px solid #3c4449;
}
.footer-menu li a{
  font-size: 13px !important;
  color: #93999d !important;
}
.menu-switch{
  justify-content: space-between;
  display: flex !important;
}
</style>
