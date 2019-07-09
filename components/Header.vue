<template>
  <div class="header">
    <a-row>
      <a-col :span="8">
        <div class="open-menu">
          <a-button type="ghost" icon="align-left" v-on:click="open()">
          </a-button>
        </div>
      </a-col>
      <a-col :span="8">
         <nuxt-link to="/" class="title-blog">badego</nuxt-link>
      </a-col>
      <a-col :span="8">
        <a-button type="ghost">
          <i class="material-icons">search</i>
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data () {
    return {
      title: 'Hello World!'
    }
  },
  methods:{
    open(){
      this.$store.commit('menu/menuList', true)
    }
  }
}
</script>

<style>
.header{
    border-bottom: 1px solid #e0e0e0;
    padding: 15px;
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
  text-align: center;
}
.open-menu button{
  font-size: 18px;
}
</style>
