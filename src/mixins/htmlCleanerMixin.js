import { truncate } from "lodash"

export default {
  methods: {
    stripTags(text) {
      if (null === text) {
        return text
      }
      return text
        .replace("</p>", " ")
        .replace("<br>", " ")
        .replace("<br/>", " ")
        .replace(/<[^>]*>?/gm, "")
    },
    shorten(text, chars, omissionString = "...") {
      return truncate(text, {
        length: chars,
        separator: " ",
        omission: omissionString
      })
    }
  }
}
