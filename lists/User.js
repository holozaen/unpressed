const {
  File,
  Text,
  Checkbox,
  Select,
  Password,
  Relationship,
  Slug
} = require("@keystonejs/fields")
const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce")
const { atTracking } = require("@keystonejs/list-plugins")
const { LocalFileAdapter } = require("@keystonejs/file-adapters")
const fileAdapter = new LocalFileAdapter({
  src: "src/static/img",
  path: "/img"
})
function deleteImageFileFromExistingItem(item) {
  if (item && item.hasOwnProperty("image")) {
    try {
      if (item.image) {
        fileAdapter.delete(item.image)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

const { userIsAdmin, userIsAdminOrOwner } = require("../auth/Acl")

module.exports = {
  access: {
    read: true,
    update: userIsAdminOrOwner,
    create: userIsAdmin,
    delete: userIsAdmin,
    auth: true
  },
  fields: {
    name: { type: Text },
    slug: { type: Slug, from: "name", regenerateOnUpdate: false },
    state: {
      type: Select,
      options: ["active", "deactivated"],
      defaultValue: "active"
    },
    isAdmin: {
      type: Checkbox,
      defaultValue: false,
      access: {
        update: userIsAdmin
      }
    },
    email: {
      type: Text,
      // 2. Only authenticated users can read/update their own email, not any other user's.
      // Admins can read/update anyone's email.
      access: ({ existingItem, authentication: { item } }) => {
        return item.isAdmin || existingItem.id === item.id
      },
      isUnique: true
    },
    password: {
      type: Password,
      access: {
        // 3. Only admins can see if a password is set. No-one can read their own or other user's passwords.
        read: ({ authentication }) => authentication.item.isAdmin,
        // 4. Only authenticated users can update their own password. Admins can update anyone's password.
        update: ({ existingItem, authentication: { item } }) => {
          return item.isAdmin || existingItem.id === item.id
        }
      }
    },
    content: { type: Wysiwyg, height: 400, isRequired: false },
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
    posts: { type: Relationship, ref: "Post.author", many: true }
  },
  hooks: {
    afterDelete: ({ existingItem }) => {
      deleteImageFileFromExistingItem(existingItem)
    }
  },
  plugins: [atTracking()],
  labelField: "name",
  adminConfig: {
    defaultSort: "name",
    defaultColumns: "image, email, state"
  }
}
