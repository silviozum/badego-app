<template>
  <div>
  <div class="comments" v-if="comments">
    <a-comment v-for="(item,index) in comments" :key="index">
      <span class="date-comment" slot="actions">{{item.data.createdAt | moment("from", "now", true)}}</span>
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
     Commentar
   </a-button>
 </a-form-item>
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
          this.comments.push(sendComment)
          this.value = ''
        }, 1000)
      }

    },
    handleChange(e) {
      this.value = e.target.value
    }
  },
  async mounted(){
    const getComments = await commentsService.getComments(this.$route.params.id)
    this.comments = getComments
  }
}
</script>

<style>
.comments{
  color: #fff;
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
.btn-submit-comments{
  border: 0 !important;
  position: absolute;
  top: 0;
}
.btn-submit-comments:hover{
  color: #de8145 !important
}
</style>
