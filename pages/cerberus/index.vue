<template>
  <div class="mobile-menu">
    <Menu />
  </div>
</template>

<script>
import Menu from '../../components/Menu'
export default {
  name:'Navegate',
  components:{
    Menu
  }
}
</script>

<style>
.mobile-menu .menu{
  position: inherit;
  width: 100%;
  padding-top: 70px;
  height: calc(100vh);
}
</style>
