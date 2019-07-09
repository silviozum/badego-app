<template>
  <div class="categories">
    <nav>
      <li><nuxt-link to="/">#tecnolgia</nuxt-link></li>
      <li><nuxt-link to="/">#pravida</nuxt-link></li>
      <li><nuxt-link to="/">#ideias</nuxt-link></li>
    </nav>
  </div>
</template>

<script>
export default {
  name:'Catergories',
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
