export const state = () => ({
  enabled: true
})

export const mutations = {
  DISABLE(state) {
    state.enabled = false
  },
  ENABLE(state) {
    state.enabled = true
  }
}

export const actions = {
  disableTracking({ commit }) {
    commit("DISABLE")
  },
  enableTracking({ commit }) {
    commit("ENABLE")
  }
}

export const getters = {
  trackingEnabled(state) {
    return state.enabled
  }
}
