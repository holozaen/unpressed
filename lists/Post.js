const { DateTime, File, Text, Slug, Select, Relationship, Integer} = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce')
const { AuthedRelationship } = require('@keystonejs/fields-authed-relationship');
const { atTracking } = require('@keystonejs/list-plugins');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const { isUser, userIsAdminOrOwner } = require('../auth/Acl')
const sitemapGenerator = require('../sitemap/sitemapGenerator')
const fileAdapter = new LocalFileAdapter({
  src: 'src/static/img',
  path: '/img'
});


function deleteImageFileFromExistingItem(item) {
  if (item && item.hasOwnProperty('image')) {
    try {
      if (item.image) {
        fileAdapter.delete(item.image)
      }
    } catch (e) {
      console.log(e)
    }
  }
}


module.exports = {
  access: {
    read: true,
    update: userIsAdminOrOwner,
    create: isUser,
    delete: userIsAdminOrOwner,
    auth: false,
  },
  fields: {
    title: { type: Text, isRequired: true },
    slug: { type: Slug, from: 'title', regenerateOnUpdate: false },
    state: { type: Select, options: 'draft, published, archived', defaultValue: 'draft' },
    author: { type: AuthedRelationship, ref: 'User.posts', access: {
        create: userIsAdminOrOwner,
        update: userIsAdminOrOwner,
      }
    },
    tags: {type: Relationship, ref: 'Tag.posts', many: true },
    categories: {type: Relationship, ref: 'Category.posts', many: true },
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
      },
    },
    relatedEvent: {type: Integer, isRequired: false },
    metaTitle: {
      type: Text,
      isRequired: false,
    },
    metaDescription: {
      type: Text,
      isRequired: false,
      isMultiline: true
    },
    publishedAt: {
      type: DateTime,
      format: 'MM/DD/YYYY'
    }
  },
  hooks: {
    afterChange: ({ existingItem, updatedItem, actions: { query }}) => {
      sitemapGenerator.save(query, process.env.APP_URL)
      if (updatedItem.state === 'published' && (!existingItem || existingItem.state !== updatedItem.state)) {
        const currentDate = new Date().toISOString()
        query(
          `mutation {
            updatePost(id: "${updatedItem.id}", data: { publishedAt: "${currentDate}"}) {
              id
             }
          }`
        )
        .catch((e) => {
          console.log(e)
        })
      } else if (existingItem && existingItem.state !== updatedItem.state) {
        query(
          `mutation {
            updatePost(id: "${updatedItem.id}", data: { publishedAt: null}) {
              id
             }
          }`
        )
        .catch((e) => {
          console.log(e)
        })
      }
    },
    afterDelete: ({ existingItem, actions: { query }}) => {
      sitemapGenerator.save(query, process.env.APP_URL)
      deleteImageFileFromExistingItem(existingItem)
    },
  },
  plugins: [
    atTracking()
  ],
  labelField: 'title',
  adminConfig: {
    defaultSort: '-createdAt',
    defaultColumns: 'image, author, state, relatedEvent, publishedAt'
  }
};
