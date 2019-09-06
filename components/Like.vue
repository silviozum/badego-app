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
  props:['id','authorId', 'list'],
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
    },
    user(){
      return  JSON.parse(localStorage.getItem('user'))
    }
  },
  methods:{
    likeIt(){

      this.listIdLikes.push(this.user.uid)
      const setLike = userService.like(this.id, this.listIdLikes)
      this.ifLikeIt = true
    }
  },
   mounted(){
     console.log(this.list)
     if(this.list.length > 0){
      this.list.forEach(item =>{
        this.listIdLikes.push(item.stringValue)
      })
      if(this.listIdLikes.indexOf(this.user.uid) === 1){
        this.showButtonLike = false
      }else{
        this.showButtonLike = true
      }
    }else{
      console.log('oi')
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
