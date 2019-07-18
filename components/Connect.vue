</a-col>
<template>
  <div>
    <a-button icon="google" v-on:click="auth()">Conectar com Google</a-button>
  </div>
</template>

<script>
import { userService } from '../services'
export default {
  name: 'Connect',

  methods:{
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
    }
  }
}
</script>

<style>

</style>
