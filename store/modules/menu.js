
const state = {
  openMenu: false,
}

const mutations = {
  menuList (state, payload) {
    state.openMenu = payload
  },
}

const getters = {
  getMenu: state => state
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
