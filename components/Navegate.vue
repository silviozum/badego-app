<template>
  <div class="content-navegate">
    <div class="navegate">
      <div class="item-navegate">
        <button v-on:click="goToHome()">
          <i class="zwicon-text-align-justify"  v-bind:class="{'active-item-navegate':local === 'index'}"></i>
        </button>
      </div>
      <div class="item-navegate">
        <button>
          <i class="zwicon-bookmark"></i>
        </button>
      </div>
      <div class="item-navegate">
        <button v-on:click="goToPost()">
          <i class="zwicon-edit-square-feather" v-bind:class="{'active-item-navegate':local === 'post'}"></i>
        </button>
      </div>
      <div class="item-navegate">
        <button v-on:click="goToUser()">
          <i class="zwicon-user" v-bind:class="{'active-item-navegate':local === 'user'}"></i>
        </button>
      </div>
      <div class="item-navegate">
        <button v-on:click="goToMenu()">
          <i class="zwicon-toggle-switch" v-bind:class="{'active-item-navegate':local === 'cerberus'}"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:'Navegate',
  methods:{
    goToMenu(){
      this.$router.push({name:'cerberus'})
    },
    goToHome(){
      this.$router.push({name:'index'})
    },
    goToPost(){
      this.$router.push({name:'post-id'})
    },
    goToUser(){
      this.$router.push({name:'user-id',params:{id:this.user.uid}})
    }
  },
  computed:{
    local(){
      return this.$route.name
    },
    user(){
      const item  = this.$store.getters['user/getUser'];
      return item
    },
  }
}
</script>

<style>
.content-navegate{
  height: 76px;
  display: none;
  position: fixed;
  bottom: -1px;
  background-color: #1c1f21;
  width: 100%;
  z-index: 99999999;
}
.navegate{
  width: 100%;
  height: 100%;
  border-top: 1px solid #2f3438;
  text-align: center;
}
.item-navegate{
  width: 18%;
  height: 100%;
  display: inline-block;
}
.item-navegate button{
  width: 100%;
  height: 100%;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.item-navegate button i{
  font-size: 30px;
  color: #4c5358;
}
.item-navegate button:hover i,
.active-item-navegate{
  color: #fff !important;
}
@media screen and (max-width: 980px){
  .content-navegate{
    display: block;
  }
}
</style>
