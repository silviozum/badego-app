<template>
  <div class="main-to-post">
  <div class="content-editor">

    <div class="content-banner-editor"

      :style="{ backgroundImage: 'url(\'' + serie.imgRelated + '\')' }">
      <Loading v-if="loading"/>
      <form ref="form" >
        <input
        id="files"
        type="file"
        class="custom-file-input"
        name="file"
        ref="uploadInput"
        accept="image/*"
        :multiple="false"
        @change="detectFiles($event, 'image')" />
      </form>
    </div>

    <input type="title" v-model="serie.title" class="edit-post-title">
    <textarea v-model="serie.description" class="edit-post-textarea"></textarea>
    <div class="serie-list-article">
      <ul>
        <li v-for="(item,index) in megaData">
          <a-checkbox @change="getListUsers(item.data.uid, index)">{{item.data.name}}</a-checkbox>
          <span>{{item}}</span>
        </li>
      </ul>
    </div>

    <div class="serie-list-article">
      <ul>
        <li v-for="article in articlesUser">
          <a-checkbox @change="onChange(article.data.id)">{{article.data.title}}</a-checkbox>
        </li>
      </ul>
    </div>

    <div class="content-submit" v-if="toEdit">
      <button v-on:click="edit()">salvar</button>
    </div>

  </div>
</div>
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Tags from '../../components/Tags'
import Loading from '../../components/Loading'
import { userService } from '../../services'
import { articleService } from '../../services'

export default {
  data () {
    return {
      toEdit: true,
      loading:false,
      showIframe:false,
      articlesUser:'',
      megaData: '',
      listUsers: '',
      articlesToSave:'',
      dataSource: [],
      titleType:'artigo',
      serie:{
          title:'Título da materia preenche o thumb',
          description:'descricao do role',
          imgRelated:''
      }
    }
  },
  methods: {
    onChange(e) {
      console.log(e);
    },
    async getListUsers(e, index){

      const list = await userService.userArticles(e)
      this.megaData[index].otherData = list
      console.log(this.megaData)
    }
  },
  async mounted(){
    let userToCreate = localStorage.getItem('user');
    userToCreate = JSON.parse(userToCreate)

    const articles = await userService.userArticles(userToCreate.uid)
    this.articlesUser = articles

    const listUsers = await userService.listAllUsers()
    this.listUsers = listUsers
    const megaData = []
    this.listUsers.map(function(item){
      megaData.push(item)
    })
    this.megaData = megaData
    }
  }

</script>

<style>
.serie-list-article {
  margin: 20px 0;
}
.serie-list-article ul li label{
  color: #fff;
}
</style>
