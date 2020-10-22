const {
  Checkbox,
  DateTime,
  File,
  Text,
  Slug,
  Select,
  Relationship
} = require("@keystonejs/fields")
const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce")
const { atTracking } = require("@keystonejs/list-plugins")
const { LocalFileAdapter } = require("@keystonejs/file-adapters")
const { userIsAdmin, isUser, userIsAdminOrOwner } = require("../auth/Acl")
const sitemapGenerator = require("../sitemap/sitemapGenerator")
const fileAdapter = new LocalFileAdapter({
  src: "src/static/img",
  path: "/img"
})
const { gql } = require("apollo-server-express")

function deleteImageFileFromExistingItem(item) {
  if (item && Object.prototype.hasOwnProperty.call(item, "image")) {
    try {
      if (item.image) {
        fileAdapter.delete(item.image)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

let list = {
  access: {
    read: true,
    update: userIsAdminOrOwner,
    create: isUser,
    delete: userIsAdminOrOwner,
    auth: false
  },
  fields: {
    title: { type: Text, isRequired: true },
    slug: { type: Slug, from: "title", regenerateOnUpdate: false },
    state: {
      type: Select,
      options: "draft, published, archived",
      defaultValue: "draft"
    },
    author: {
      type: Relationship,
      ref: "User.posts",
      access: {
        create: userIsAdmin,
        update: userIsAdminOrOwner
      },
      many: false
    },
    tags: { type: Relationship, ref: "Tag.posts", many: true },
    categories: { type: Relationship, ref: "Category.posts", many: true },
    excerpt: { type: Wysiwyg, height: 150 },
    content: { type: Wysiwyg, height: 400, isRequired: true },
    image: {
      type: File,
      adapter: fileAdapter,
      isRequired: false,
      hooks: {
        beforeChange: ({ existingItem }) => {
          deleteImageFileFromExistingItem(existingItem)
        }
      }
    },
    metaTitle: {
      type: Text,
      isRequired: false
    },
    metaDescription: {
      type: Text,
      isRequired: false,
      isMultiline: true
    },
    publishedAt: {
      type: DateTime,
      format: "MM/dd/yyyy"
    }
  },
  hooks: {
    afterChange: ({ existingItem, updatedItem, context }) => {
      sitemapGenerator.save(context, process.env.APP_URL)
      if (
        updatedItem.state === "published" &&
        (!existingItem || existingItem.state !== updatedItem.state)
      ) {
        const currentDate = new Date().toISOString()
        context
          .executeGraphQL({
            context,
            query: gql`mutation {
            updatePost(id: "${updatedItem.id}", data: { publishedAt: "${currentDate}"}) {
              id
             }
          }`
          })
          .catch(e => {
            console.log(e)
          })
      } else if (existingItem && existingItem.state !== updatedItem.state) {
        context
          .executeGraphQL({
            context,
            query: gql`mutation {
            updatePost(id: "${updatedItem.id}", data: { publishedAt: null}) {
              id
             }
          }`
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    afterDelete: ({ existingItem, context }) => {
      sitemapGenerator.save(context, process.env.APP_URL)
      deleteImageFileFromExistingItem(existingItem)
    }
  },
  plugins: [atTracking()],
  labelField: "title",
  adminConfig: {
    defaultSort: "-createdAt",
    defaultColumns: "image, author, state, publishedAt"
  }
}

if (
  process.env.POSTS_ENABLE_COMMENTS !== "" &&
  process.env.POSTS_ENABLE_COMMENTS !== "false"
) {
  list.fields.comments = { type: Relationship, ref: "Comment.post", many: true }
  list.fields.commentable = {
    type: Checkbox,
    defaultValue:
      process.env.POSTS_DEFAULT_COMMENTABLE !== "" &&
      process.env.POSTS_DEFAULT_COMMENTABLE !== false
  }
}

module.exports = list
