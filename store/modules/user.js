
const state ={
  theme:'ligth',
   user:{
     name:'name',
     email:'email',
     uid:0,
     photo:'defaul',
     logged:false,

   }
}

const mutations = {
  setUser (state, payload) {
    console.log(state)
    state.user = payload
  },
  setTheme (state, payload) {
    console.log(payload)

    if(payload === true){
      state.theme = 'dark'
    }else{
      state.theme = 'light'
    }

    console.log(state.theme )


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
  getUser: state => state.user,
  getTheme: state => state.theme
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
