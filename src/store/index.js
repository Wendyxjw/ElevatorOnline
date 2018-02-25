// Vuex 
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var state = {
    pluginsData:{}
}
var mutations = {
  changePlugins(state, data) {
    state.pluginsData = data;
  },

}
var actions = {
   getPluginsData: function (context, data) {
    context.commit("changePlugins", data);
  }
}

export default new Vuex.Store({
   state:state,
   actions:actions,
   mutations:mutations
})
