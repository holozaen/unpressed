const { Integer, Text, Slug, Select } = require("@keystonejs/fields")
const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce")
const { atTracking } = require("@keystonejs/list-plugins")
const sitemapGenerator = require("../sitemap/sitemapGenerator")
const { userIsAdmin } = require("../auth/Acl")

module.exports = {
  access: {
    read: true,
    update: userIsAdmin,
    create: userIsAdmin,
    delete: userIsAdmin,
    auth: false
  },
  fields: {
    title: { type: Text, isRequired: true },
    slug: { type: Slug, from: "title", regenerateOnUpdate: false },
    content: { type: Wysiwyg, isRequired: true, height: 400 },
    menu: { type: Select, options: "top,bottom", defaultValue: "bottom" },
    position: { type: Integer, isRequired: true, defaultValue: "0" },
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
    afterChange: ({ context }) => {
      sitemapGenerator.save(context, process.env.APP_URL)
    },
    afterDelete: ({ context }) => {
      sitemapGenerator.save(context, process.env.APP_URL)
    }
  },
  plugins: [atTracking()],
  labelField: "title",
  adminConfig: {
    defaultSort: "position",
    defaultColumns: "menu, position"
  }
}
