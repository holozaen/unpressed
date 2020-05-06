export const state = () => ({
  list: [],
})

export const mutations = {
  SET_LIST_TO_STORE(state, data) {
    state.list = data
  }
}

export const actions = {
  async fetch ({ commit }) {
    try {
      let query = `
      query GetPages {
        allPages {
          menu
          position
          title
          slug
          content
          metaTitle
          metaDescription
         }
      }
    `;
      const { data } = await this.$graphqlClient.fetch(query);
      commit('SET_LIST_TO_STORE', data.allPages)
    } catch (e) {
      console.log(e)
    }
  }
}

export const getters = {
  all(state) {
    return state.list
  },
  top(state) {
    return state.list.filter(page => {
      return page.menu === 'top'
    })
  },
  bottom(state) {
    return state.list.filter(page => {
      return page.menu === 'bottom'
    })
  },
  slug: state => slug => {
    return state.list.find(page => page.slug === slug)
  }
}
