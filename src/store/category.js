export const state = () => ({
  current: null,
  list: [],
  navigationList: []
})

export const mutations = {
  SET_LIST_TO_STORE(state, data) {
    state.list = data
  },
  SET_NAVIGATION_TO_STORE(state, data) {
    state.navigationList = data
  }
}

export const actions = {
  async fetchNavigation ({ commit }) {
    let query = `
      query GetCategories {
        allCategories(orderBy: "position_ASC") {
          position
          name
          slug
          content
          createdAt
          updatedAt
         }
      }
    `;
    const { data } = await this.$graphqlClient.fetch(query);
    commit('SET_NAVIGATION_TO_STORE', data.allCategories)
  }
}

export const getters = {
  navigationList(state) {
    return state.navigationList
  },
  all(state) {
    return state.list
  }
}
