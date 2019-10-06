<template>
  <div>
  <div class="interactions">
    <button  class="like-button"  v-on:click="likeIt()" :class="{'already-like':ifLikeIt }" :disabled="ifLikeIt">
      <i class="zwicon-thumbs-up"></i>
    </button>
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
    async likeIt(){

      this.listIdLikes.push(this.user.uid)
      const setLike = await userService.like(this.id, this.listIdLikes)
      console.log(setLike)

      this.ifLikeIt = true
    }
  },
   mounted(){

     if(this.list.length > 0){
      this.list.forEach(item =>{
        this.listIdLikes.push(item.stringValue)
      })
      if(this.listIdLikes.indexOf(this.user.uid) === 1){
        this.showButtonLike = false
        this.ifLikeIt = true
      }else{
        this.showButtonLike = true
      }
    }
  }

}
</script>

<style>


.like-button{
  border:none;
  cursor: pointer;
  background-color: transparent;
}
.like-button i{
  font-size: 40px;
}
.like-button:hover i, .already-like i{
  color:#de8145 !important;
}


</style>
