</a-col>
<template>
  <div>
    <div class="content-sidebar">
      <div class="sidebar">
        <div class="header-sidebar">
          <div style="text-align:left;">
           <nuxt-link to="/" class="title-blog">badego</nuxt-link>
         </div>
         <div style="text-align:right;">
           <a-button type="ghost" icon="align-right" v-on:click="close()"></a-button>
         </div>
        </div>
        <div class="auth"  v-if="!user.logged">
          <a-button icon="google" v-on:click="auth()">Conectar com Google</a-button>
        </div>
        <div class="user-preview" v-if="user.logged">
           <nuxt-link to="/" class="content-user-pic">
             <img :src="user.photo">
           </nuxt-link>

           <span>{{user.name}}</span>
           <nuxt-link to="/post" class="side-link">publicar!!!!</nuxt-link>
        </div>

        <div class="menu">
          <nav>
            <li><nuxt-link to="/">feed de noticias</nuxt-link></li>
            <li><nuxt-link to="/">mais lidas</nuxt-link></li>
            <li><nuxt-link to="/">O que é o badego</nuxt-link></li>
            <li><nuxt-link to="/">politicas de privacidade</nuxt-link></li>
          </nav>
        </div>
        <span class="copyright">creative commons</span>
        <a-button type="ghost" v-on:click="logout()" icon="logout"></a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { userService } from '../services'
export default {
  name: 'Sidebar',
  data () {
    return {
      open:false
    }
  },

  methods:{
    close(){
      this.$store.commit('menu/menuList', false)
    },
    async auth(){
      const user = await userService.auth()
      if(user){
      const setUser = {
        name:user.displayName,
        email:user.email,
        uid:user.uid,
        photo:user.photoURL,
        logged:true
      }

      this.$store.commit('user/setUser', setUser)
      localStorage.setItem('user', JSON.stringify(setUser))
      this.$store.commit('menu/menuList', false)
      location.reload();
    }

    },
    async logout(){
      const logout = await userService.logout();
      this.$store.commit('user/logout')
    }

  },
  computed:{
    user(){
      const item  = this.$store.getters['user/getUser'];
      return item
    }
  },
  beforeCreate() {
    this.$store.commit('user/userLogged');
  }
}
</script>

<style>
.content-sidebar{
  position: fixed;
  background-color: rgba(73,43,25, 0.9);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 100;
}
.sidebar{
  position: absolute;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
  top: 0;
  left:0;
  width: 35%;
}
.header-sidebar{
  display: flex;
  padding: 10px;
}
.header-sidebar div{
  width: 50%;
}
.header-sidebar div button{
  font-size: 18px;
}
.menu{
  padding: 10px 0 20px 10%;
  border-top: 1px solid #e0e0e0;
}
.login{
  padding-top: 20px;
}
.copyright{
  color: #c1c1c1;
  font-style: italic;
  padding-left: 10%;
  font-size: 13px;
  margin-top: 70px;
  display: block;
}
.menu nav li,
.side-link{
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
  font-style: italic;
  display: block;
}
.auth{
  padding-left: 10%;
  margin-top: 15%;
  padding-bottom: 20px;
}
.auth button{
  border-radius: 20px;
}
.user-preview{
  text-align: center;
  margin-top: 10%;
  padding: 20px 0;
  background-color: #393a3b;
  color: #fff;
}
.user-preview span{
  display:block;
  margin-top: 10px;
  margin-bottom: 20px;
}
.user-preview a{
  color:#de8145
}
.content-user-pic{
  width: 30%;
  display: block;
  margin: 0 auto;

}
.content-user-pic img{
  width: 100%;
  border-radius: 50%
}
@media(max-width:580px){
  .sidebar{width: 100%;}
}
</style>
