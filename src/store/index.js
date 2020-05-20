export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch("category/fetchNavigation")
    await dispatch("page/fetch")
  }
}
