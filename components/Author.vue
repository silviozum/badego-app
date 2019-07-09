<template>
  <div class="author">
    <span>de,</span>
    <a href="#">silvio freitas</a>
  </div>
</template>

<script>
export default {
  name:'Author',
  data () {
    return {
      title: 'Hello World!'
    }
  }
}
</script>

<style>
.author{
  display: flex;
  font-weight: bold;
  font-style: italic;
}
.author span{
  color:#c1c1c1;
}
.author a{
  margin-left: 5px;
  color: #de8145;
}
</style>
