export default {
    state: {
      login: []
    },
    // getters: {},
    mutations: {
      setProducts (state, products) {
        state.login = products
      }
    },
    actions: {
      getLoginProducts ({ commit },products) {
        commit('setProducts', products)
      }
    }
}