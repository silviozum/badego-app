
const state ={
  theme:'dark',
  headerMenu: false,
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
    state.user = payload
  },
  setTheme (state, payload) {
    if(payload){
      state.theme = 'dark'
      localStorage.setItem('theme', 'dark')
    }else{
      state.theme = 'ligth'
      localStorage.setItem('theme', 'ligth')
    }
  },
  openMenuUser(state,payload){
    state.headerMenu = payload
  },
  defaultTheme (state, payload) {
    state.theme = payload
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
  getTheme: state => state.theme,
  getMenuState: state => state.headerMenu
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
