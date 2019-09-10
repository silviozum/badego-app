import Vuex from 'vuex';
import User from './modules/user';


const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      user:User
    }
  });
};

export default createStore
