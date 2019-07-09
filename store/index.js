import Vuex from 'vuex';
import Menu from './modules/menu';
import User from './modules/user';


const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      menu: Menu,
      user:User
    }
  });
};

export default createStore
