export default {
  data() {
    return {
      meta: {
        title: null,
        description: null,
        image: null
      }
    }
  },
  head() {
    let self = this
    if (process.browser) {
      this.meta.title = document.title
      this.meta.description = document.head.querySelector(
        "meta[name='description']"
      ).content
      this.meta.image = this.getSocialImage()
    }
    return {
      changed({ title }) {
        self.meta.title = title
        self.meta.description = document.head.querySelector(
          "meta[name='description']"
        ).content
        // self.meta.image = this.getSocialImage()
      }
    }
  },

  methods: {
    getSocialImage() {
      let path = ""
      switch (this.$route.path) {
        case "/":
          if (
            undefined === document.body.querySelector("img") ||
            document.body.querySelector("img") === null
          ) {
            return null
          }
          path =
            process.env.BASE_URL +
            document.body.querySelector("img").getAttribute("src")
          return path
        default:
          return this.getMatchingImage()
      }
    },
    getMatchingImage() {
      const images = document.body.querySelectorAll("img")
      if (undefined === images || !Array.isArray(images)) {
        return null
      }
      if (images.length > 1) {
        return images[1].getAttribute("src")
      }
      if (images.length > 0) {
        return images[0].getAttribute("src")
      }
      return null
    }
  }
}
