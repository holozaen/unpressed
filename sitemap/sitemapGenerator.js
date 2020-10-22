const { LocalFileAdapter } = require("@keystonejs/file-adapters")
const { Readable } = require("stream")
const { gql } = require("apollo-server-express")

const fileAdapter = new LocalFileAdapter({
  src: "src/static",
  path: "/",
  getFilename: () => "sitemap.xml"
})

let baseUrl = ""
let stream = ""

const generator = {
  save: async function(context, base) {
    try {
      const { data, errors } = await context.executeGraphQL({
        context,
        query: gql`
          query {
            allPages {
              slug
              updatedAt
            }
            allPosts(where: { state: published }) {
              slug
              updatedAt
            }
            allCategories {
              slug
              updatedAt
            }
            allTags {
              slug
              updatedAt
            }
          }
        `
      })
      if (errors) {
        console.log(errors)
      } else {
        baseUrl = base
        this.addHeader()
        this.addIndex()
        this.addPages(data.allPages)
        this.addPosts(data.allPosts)
        this.addCategories(data.allCategories)
        this.addTags(data.allTags)
        this.addFooter()
        const readable = Readable.from(stream)
        await fileAdapter.save({ stream: readable, filename: "sitemap.xml" })
      }
    } catch (e) {
      console.log(e)
    }
  },
  addHeader: function() {
    stream =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  },
  addIndex: function() {
    this.today = new Date().toISOString()
    stream +=
      "<url>\n" +
      "  <loc>" +
      baseUrl +
      "</loc>\n" +
      "  <lastmod>" +
      this.today +
      "</lastmod>\n" +
      "  <changefreq>daily</changefreq>\n" +
      "  <priority>1</priority>\n" +
      "</url>\n"
  },
  addPages: function(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return
    }
    data.forEach(function(item) {
      stream +=
        "<url>\n" +
        "  <loc>" +
        baseUrl +
        "/page/" +
        item.slug +
        "</loc>\n" +
        "  <lastmod>" +
        item.updatedAt +
        "</lastmod>\n" +
        "  <changefreq>weekly</changefreq>\n" +
        "  <priority>0.6</priority>\n" +
        "</url>\n"
    })
  },
  addPosts: function(data) {
    if (!Array.isArray(data) || data.length === 0) return
    data.forEach(function(item) {
      stream +=
        "<url>\n" +
        "  <loc>" +
        baseUrl +
        "/" +
        item.slug +
        "</loc>\n" +
        "  <lastmod>" +
        item.updatedAt +
        "</lastmod>\n" +
        "  <changefreq>daily</changefreq>\n" +
        "  <priority>1</priority>\n" +
        "</url>\n"
    })
  },
  addCategories: function(data) {
    if (!Array.isArray(data) || data.length === 0) return
    data.forEach(function(item) {
      stream +=
        "<url>\n" +
        "  <loc>" +
        baseUrl +
        "/category/" +
        item.slug +
        "</loc>\n" +
        "  <lastmod>" +
        item.updatedAt +
        "</lastmod>\n" +
        "  <changefreq>daily</changefreq>\n" +
        "  <priority>0.8</priority>\n" +
        "</url>\n"
    })
  },
  addTags: function(data) {
    if (!Array.isArray(data) || data.length === 0) return
    data.forEach(function(item) {
      stream +=
        "<url>\n" +
        "  <loc>" +
        baseUrl +
        "/tag/" +
        item.slug +
        "</loc>\n" +
        "  <lastmod>" +
        item.updatedAt +
        "</lastmod>\n" +
        "  <changefreq>weekly</changefreq>\n" +
        "  <priority>0.8</priority>\n" +
        "</url>\n"
    })
  },
  addFooter: function() {
    stream += "</urlset>"
  }
}

module.exports = generator
