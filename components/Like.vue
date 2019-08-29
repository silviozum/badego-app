<template>
  <div>
  <div class="interactions" v-if="showButtonLike ">

    <a-button v-if="!ifLikeIt" ghost icon="like"  v-on:click="likeIt()"/>
    <span v-if="ifLikeIt"> show!!</span>
  </div>
  </div>
</template>

<script>
import { userService } from '../services'

export default {
  props:['id', 'list'],
  data () {
    return {
      listIdLikes: [],
      ifLikeIt: false,
      showButtonLike :true
    }
  },

  computed:{

  },
  async mounted(){

  },
  computed:{
    count(){
      return this.listIdLikes.length
    }
  },
  methods:{
    likeIt(){

      let user = JSON.parse(localStorage.getItem('user'))
      this.listIdLikes.push(user.uid)
      const setLike = userService.like(this.id, this.listIdLikes)
      console.log(setLike)
      this.ifLikeIt = true
    }
  },
   mounted(){
     if(this.list){
      this.list.forEach(item =>{
        this.listIdLikes.push(item.stringValue)
      })
      if(this.list.indexOf(this.id) === -1){
        this.showButtonLike = false
      }
    }
  }

}
</script>

<style>

.interactions{
  float: left;
    padding-left: 12px;
    padding-top: 10px;
}


</style>
