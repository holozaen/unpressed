const { Relationship, Select } = require("@keystonejs/fields")
const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce")
const { atTracking } = require("@keystonejs/list-plugins")
const { userIsAdminOrOwner } = require("../auth/Acl")

module.exports = {
  access: {
    read: true,
    update: userIsAdminOrOwner,
    create: true,
    delete: userIsAdminOrOwner,
    auth: false
  },
  defaultSort: "-createdAt",
  fields: {
    post: { type: Relationship, ref: "Post.comments", isRequired: true },
    state: {
      type: Select,
      options: "pending, published, archived",
      defaultValue: "pending"
    },
    content: { type: Wysiwyg, height: 400, isRequired: true }
  },
  plugins: [atTracking()],
  adminConfig: {
    defaultSort: "-createdAt",
    defaultColumns: "post, content, createdAt"
  }
}
