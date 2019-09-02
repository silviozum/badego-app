<template>
  <div class="author">
    <div class="author-avatar">
      <img :src="author.mapValue.fields.photo.stringValue">
    </div>
    <div class="author-infos">
      <a href="#">{{author.mapValue.fields.name.stringValue}}</a>
      <span class="date-release">{{dateRelease| moment("from", "now", true)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'Author',
  props:['author', 'dateRelease'],
  data () {
    return {
      title: 'Hello World!'
    }
  }
}
</script>

<style>
.author{
  font-weight: bold;
  font-style: italic;
  display: flex;
  padding-left: 40px;
}

.author span{
  color:#93999d;
  font-size: 12px;
  font-weight: normal;
}
.author a{
  color: #de8145;
  font-size: 14px;
  white-space: nowrap;
}
.author-avatar{
  width: 44px;
  max-width: 54px;
  display: inline-block;
}
.author-avatar img{
  width: 100%;
  border-radius: 100px;
}
.author-infos{
  line-height: 20px;
  margin-left: 14px;
  display: block;
  white-space:

}
.date-release{
  color: #fff;
  font-size: 13px;
  font-style: normal;
  display: block;
}


</style>
