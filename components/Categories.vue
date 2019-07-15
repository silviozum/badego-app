<template>
  <div class="categories">
    <nav>
      <li v-for="item in tags.arrayValue.values"><nuxt-link to="/">#{{item.stringValue}}</nuxt-link></li>
    </nav>
  </div>
</template>

<script>
export default {
  name:'Catergories',
  props:['tags'],
  data () {
    return {
      title: 'Hello World!'
    }
  }
}
</script>

<style>
.categories{
  display: flex;
}
.categories li{
  margin-right: 10px;
  display: inline-block;
  font-style: italic;
}
.categories li a:hover{
  color: #000;
}
</style>
