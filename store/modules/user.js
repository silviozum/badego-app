
const state ={
   user:{
     name:'namme',
     email:'email',
     uid:0,
     photo:'defaul',
     logged:false
   }
}

const mutations = {
  setUser (state, payload) {
    console.log(state)
    state.user = payload
  },
  userLogged(state){
    var localUser = localStorage.getItem('user')
    if(localUser){
      state.user = JSON.parse(localUser)
    }
  },
  logout(state){
    state.user = {}
  }
}

const getters = {
  getUser: state => state.user
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
