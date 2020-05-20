const { Text, Slug, Relationship } = require("@keystonejs/fields")
const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce")
const { atTracking } = require("@keystonejs/list-plugins")
const { isUser, userIsAdminOrOwner } = require("../auth/Acl")
const sitemapGenerator = require("../sitemap/sitemapGenerator")

module.exports = {
  access: {
    read: true,
    update: userIsAdminOrOwner,
    create: isUser,
    delete: userIsAdminOrOwner,
    auth: false
  },
  defaultSort: "-createdAt",
  fields: {
    name: { type: Text, required: true },
    slug: { type: Slug, from: "name" },
    posts: { type: Relationship, ref: "Post.tags", many: true },
    content: { type: Wysiwyg, height: 400 },
    metaTitle: {
      type: Text,
      isRequired: false
    },
    metaDescription: {
      type: Text,
      isRequired: false,
      isMultiline: true
    }
  },
  hooks: {
    afterChange: ({ actions: { query } }) => {
      sitemapGenerator.save(query, process.env.APP_URL)
    },
    afterDelete: ({ actions: { query } }) => {
      sitemapGenerator.save(query, process.env.APP_URL)
    }
  },
  plugins: [atTracking()],
  labelField: "name",
  adminConfig: {
    defaultSort: "name",
    defaultColumns: "posts, content"
  }
}
