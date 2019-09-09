<template>
  <div class="content-create-tags">
    <template v-for="(tag, index) in tags">
      <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
        <a-tag :key="tag" :closable="index !== 0" :afterClose="() => handleClose(tag)">
          {{`${tag.slice(0, 20)}...`}}
        </a-tag>
      </a-tooltip>
      <a-tag v-else :key="tag" :closable="index !== 0" :afterClose="() => handleClose(tag)">
        {{tag}}
      </a-tag>
    </template>
    <a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
      <a-icon type="plus" /> New Tag
    </a-tag>
  </div>
</template>
<script>
export default {
  props:['alreadyTags'],
  name:'Tags',
  data () {
    return {
      tags: [],
      inputVisible: false,
      inputValue: '',
    }
  },
  mounted(){
    console.log(this.alreadyTags)
    if(this.alreadyTags, 'oi'){

      this.tags = this.alreadyTags
    }else{
        this.tags = ['Hot ROLLS', 'ngm liga', 'São Paulo']
    }
  },
  methods: {
    handleClose (removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      this.tags = tags
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },

    handleInputChange (e) {
      this.inputValue = e.target.value
    },

    handleInputConfirm () {
      const inputValue = this.inputValue
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      console.log(tags)
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      })
       this.$emit('getTags', tags)
    },
  },
}
</script>
<style>
.content-create-tags{
    border: 1px solid #50595f;
    padding: 12px;
}
.content-create-tags .ant-tag{
    font-family: 'Droid Serif', serif !important;
    border: 1px solid #50595f !important;
    background: rgb(54,59,63) !important;
    border-radius: 0;
    color: #fff;
    font-size: 14px;
    height: auto;
    line-height: auto;
    padding: 8px 10px;
}
.content-create-tags .ant-tag input{
  font-family: 'Droid Serif', serif !important;
  border: 1px solid #50595f !important;
  background: rgb(54,59,63) !important;
  border-radius: 0;
  color: #fff;
  font-size: 14px;
  height: auto;
  line-height: auto;
  padding: 8px 10px;
}
.content-create-tags .ant-tag .anticon{
  font-size: 14px;
  color: #fff;
}
</style>
