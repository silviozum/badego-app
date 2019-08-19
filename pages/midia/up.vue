<template>
<div>
  <input type="file" id="file" ref="myFiles" class="custom-file-input"
  @change="previewFiles" multiple>
</div>
</template>

<script>
import { articleService } from '../../services'
import Author from '../../components/Author'
import Comments from '../../components/Comments'
export default {
  data () {
    return {
      files: []
    }
  },
  methods:{
    previewFiles(){
      this.files = this.$refs.myFiles.files
      console.log(this.files)
    }
  }
}
</script>

<style>

</style>
