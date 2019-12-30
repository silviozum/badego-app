<template>
  <div>
  <div class="comments" v-if="comments">
      <span class="content-title-comments">O que você acha?</span>
    <div class="content-send-comment">
    <a-form-item>
     <a-textarea :rows="4" @change="handleChange" :value="value" class="textarea-comments"></a-textarea>
   </a-form-item>

   <a-form-item>
     <a-button
       htmlType="submit"
       :loading="submitting"
       @click="handleSubmit"
         class="btn-submit-comments"

       ghost
     >
       <i class="zwicon-arrow-circle-right"></i>
     </a-button>
   </a-form-item>

 </div>
    <a-comment v-for="(item,index) in comments" :key="index">
      <span class="date-comment" slot="actions">{{item.data.createdAt | moment("from", "now", true)}}</span>
      <button
        slot="actions"
        class="like-button"
        :class="{'already-like':item.data.alreadyLike }"
        :disabled="item.alreadyLike"
        v-on:click="likeComment(item.data.like,item.id)">
        <i class="zwicon-thumbs-up">
        </i>
      </button>
      <span slot="actions" class="count-likes">{{item.data.like.length -1}}</span>
      <a slot="author">{{item.data.author.name}}</a>
      <a-avatar
        slot="avatar"
        :src="item.data.author.photo"
        alt="Han Solo"
      />
      <p slot="content">{{item.data.head_talk}}</p>
      <!-- <a-comment>
        <a slot="author">Han Solo</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
      </a-comment> -->
    </a-comment>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { commentsService } from '../services'
export default {
  name:'Comments',
  props:['id'],
  data () {
    return {
      comments: [],
      submitting: false,
      value: '',
      moment,
    }
  },
  computed:{
    user(){
      const getter = this.$store.getters['user/getUser']
      return getter
    }
  },
  methods: {
    async handleSubmit() {

      if (!this.value) {
        return;
      }
      const articleId = this.$route.params.id
      this.submitting = true
      const sendComment = await commentsService.submitComment(this.value, this.user, articleId );
      if(sendComment){
        setTimeout(() => {
          this.submitting = false
          this.comments.unshift(sendComment)
          this.value = ''
        }, 1000)
      }
    },
    handleChange(e) {
      this.value = e.target.value
    },
    async likeComment(list,commentId){
      list.push(this.user.uid)
      const like = await commentsService.likeComment(list, commentId)
    }
  },
  async mounted(){
    const getComments = await commentsService.getComments(this.$route.params.id)
    this.comments = getComments.reverse()

    const getLikes = []
    const userId = this.user.uid
    this.comments.map(function(item){
      getLikes.push(item.data.like)

      if(getLikes.indexOf(userId) < 1){
        item.data.alreadyLike = true
      }else{
        item.data.alreadyLike = false
      }
    })

    console.log(this.comments)
  }
}
</script>

<style>
.comments{
  color: #fff;
  margin: 0 auto;
}
.comments .ant-comment-content-author-name{color: #fff;}
.date-comment{
  font-size: 12px;
  cursor: inherit !important;
  color: #93999d!important;

}

.comments .ant-comment-actions{
  margin-top:3px;
  margin-bottom: 12px;
}
.comments .ant-comment-content-detail p{
  margin: 0;
}
.textarea-comments{
  color: #fff;
  background-color: #25292c;
  border: 2px solid #545658;
  margin-top: 27px;
}
.textarea-comments:hover{
  outline: none;
  border: 2px solid #ffff;
}
.ant-comment-content-author-name a{
  color: #de8145 !important;
  font-size: 12px !important;
  font-weight: bold;
  font-style: italic;
  white-space: nowrap;
}
.comments .ant-form-item{margin: 0;}
.btn-submit-comments{
  border: 0 !important;
  position: absolute !important;
  bottom: 2px !important;
  right:-6px !important;
  background-color: transparent !important;
}
.btn-submit-comments:hover{
  color: #de8145 !important
}

.ant-comment-actions > li > .count-likes{
  color: #fff;
  cursor: inherit;
}
.content-send-comment{
  height: 170px;
  position: relative;
}
.content-send-comment .ant-form-item-control,
.content-send-comment .ant-form-item-children{
  position: inherit;
}

.content-send-comment textarea.ant-input{
  height: auto;
  padding: 30px 20px;
  margin-top: 8px;
  overflow-y: hidden;
}
.ant-comment-actions > li > .count-likes:hover{color: #fff;}
@media screen and (max-width: 980px){
    .comments{
      width: 90%;
    }
}
</style>
