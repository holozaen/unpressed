import { getFilterString } from "../assets/js/filterStringGenerator"
import { getPagination } from "../assets/js/paginationCalculator"

function getOptionString({
  page = 1,
  pageSize = process.env.POSTS_DEFAULT_PAGESIZE
    ? parseInt(process.env.POSTS_DEFAULT_PAGESIZE)
    : 10,
  order = process.env.POSTS_DEFAULT_ORDER
    ? process.env.POSTS_DEFAULT_ORDER
    : "DESC",
  sortBy = process.env.POSTS_DEFAULT_SORTBY
    ? process.env.POSTS_DEFAULT_SORTBY
    : "createdAt",
  filters = [],
  onlyPublished = true
}) {
  const sortString = 'orderBy: "' + sortBy + "_" + order + '"'
  if (!page || !pageSize || !order || !sortBy || !filters)
    throw new Error("missing parameter")
  if (!Array.isArray(filters)) throw new Error("filters must be an array")
  if (onlyPublished) {
    filters.push({
      operator: "state_in",
      value: "published"
    })
  }
  const filterString = getFilterString(filters)
  const offset = (page - 1) * pageSize
  return `(first: ${pageSize}, skip: ${offset}, ${sortString}${filterString})`
}

function getBracketedFilterString({ filters }) {
  if (!Array.isArray(filters)) throw new Error("filters must be an array")
  const filterString = getFilterString(filters)
  return filterString === "" ? "" : "(" + filterString + ")"
}

export default (ctx, inject) => {
  const graphqlClient = {
    fetch: function(query, variables = {}) {
      const apiUrl = process.env.APP_URL + "/admin/api"
      return fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          variables,
          query
        })
      }).then(function(result) {
        return result.json()
      })
    },
    fetchPosts: async function({
      page = 1,
      pageSize = process.env.POSTS_DEFAULT_PAGESIZE
        ? parseInt(process.env.POSTS_DEFAULT_PAGESIZE)
        : 10,
      order = process.env.POSTS_DEFAULT_ORDER
        ? process.env.POSTS_DEFAULT_ORDER
        : "DESC",
      sortBy = process.env.POSTS_DEFAULT_SORTBY
        ? process.env.POSTS_DEFAULT_SORTBY
        : "createdAt",
      filters = [],
      onlyPublished = true
    } = {}) {
      const opts = { page, pageSize, order, sortBy, filters, onlyPublished }
      const options = getOptionString(opts)
      const filterString = getBracketedFilterString(opts)
      let query = `
      query GetPosts {
        allPosts${options} {
          id
          slug
          title
          excerpt
          commentable
          content
          publishedAt
          author {
            id
            name
            slug
          }
          image {
            path
            originalFilename
            publicUrl
          }
          categories {
            id
            name
            slug
          }
          tags {
            id
            name
            slug
          }
        },
        _allPostsMeta${filterString}{
          count
        }
      }
    `
      const { data } = await this.fetch(query)
      if (data.allPosts.length === 0) {
        throw "not found"
      }
      const pagination = getPagination(
        { page, pageSize },
        data._allPostsMeta.count
      )
      return {
        posts: data.allPosts,
        meta: {
          pagination: pagination,
          order: order ? order : "ASC",
          sortBy: sortBy ? sortBy : null
        }
      }
    },
    fetchCategoryBySlug: async function(
      slug,
      {
        page = 1,
        pageSize = process.env.POSTS_DEFAULT_PAGESIZE
          ? parseInt(process.env.POSTS_DEFAULT_PAGESIZE)
          : 10,
        order = process.env.POSTS_DEFAULT_ORDER
          ? process.env.POSTS_DEFAULT_ORDER
          : "DESC",
        sortBy = process.env.POSTS_DEFAULT_SORTBY
          ? process.env.POSTS_DEFAULT_SORTBY
          : "createdAt",
        filters = [],
        onlyPublished = true
      } = {}
    ) {
      const opts = { page, pageSize, order, sortBy, filters, onlyPublished }
      const options = getOptionString(opts)
      const filterString = getBracketedFilterString(opts)
      let query = `
      query GetCategories {
        allCategories(where: {slug: "${slug}"}) {
          id
          slug
          name
          content
          metaTitle
          metaDescription
          posts${options} {
            id
            slug
            title
            excerpt
            content
            commentable
            publishedAt
            author {
              id
              name
              slug
            }
            author {
              id
              name
              slug
            }
            image {
              path
              originalFilename
              publicUrl
            }
            categories {
              id
              name
              slug
            }
            tags {
              id
              name
              slug
            }
          }
          _postsMeta${filterString} {
            count
          }
        }
      }`
      const { data } = await this.fetch(query)
      console.log(query)
      console.log(data)
      const allCategories = data.allCategories
      if (!Array.isArray(allCategories) || allCategories.length === 0) {
        throw "not found"
      }
      const category = allCategories[0]
      const categoryPostsCount = category._postsMeta.count
      const pagination = getPagination({ page, pageSize }, categoryPostsCount)
      return {
        category: category,
        posts: category.posts,
        meta: {
          pagination: pagination,
          order: order ? order : "ASC",
          sortBy: sortBy ? sortBy : null
        }
      }
    },
    fetchTagBySlug: async function(
      slug,
      {
        page = 1,
        pageSize = process.env.POSTS_DEFAULT_PAGESIZE
          ? parseInt(process.env.POSTS_DEFAULT_PAGESIZE)
          : 10,
        order = process.env.POSTS_DEFAULT_ORDER
          ? process.env.POSTS_DEFAULT_ORDER
          : "DESC",
        sortBy = process.env.POSTS_DEFAULT_SORTBY
          ? process.env.POSTS_DEFAULT_SORTBY
          : "createdAt",
        filters = [],
        onlyPublished = true
      } = {}
    ) {
      const opts = { page, pageSize, order, sortBy, filters, onlyPublished }
      const options = getOptionString(opts)
      const filterString = getBracketedFilterString(opts)
      let query = `
      query GetTags {
        allTags(where: {slug: "${slug}"}) {
          id
          slug
          name
          content
          metaTitle
          metaDescription
          posts${options} {
            id
            slug
            title
            excerpt
            commentable
            content
            publishedAt
            author {
              id
              name
              slug
            }
            image {
              path
              originalFilename
              publicUrl
            }
            categories {
              id
              name
              slug
            }
            tags {
              id
              name
              slug
            }
          }
          _postsMeta${filterString} {
            count
          }
        }
      }`
      const { data } = await this.fetch(query)
      const allTags = data.allTags
      if (!Array.isArray(allTags) || allTags.length === 0) {
        throw "not found"
      }
      const tag = allTags[0]
      const tagPostsCount = tag._postsMeta.count
      const pagination = getPagination({ page, pageSize }, tagPostsCount)
      return {
        tag: tag,
        posts: tag.posts,
        meta: {
          pagination: pagination,
          order: order ? order : "ASC",
          sortBy: sortBy ? sortBy : null
        }
      }
    },
    fetchUserBySlug: async function(
      slug,
      {
        page = 1,
        pageSize = process.env.POSTS_DEFAULT_PAGESIZE
          ? parseInt(process.env.POSTS_DEFAULT_PAGESIZE)
          : 10,
        order = process.env.POSTS_DEFAULT_ORDER
          ? process.env.POSTS_DEFAULT_ORDER
          : "DESC",
        sortBy = process.env.POSTS_DEFAULT_SORTBY
          ? process.env.POSTS_DEFAULT_SORTBY
          : "createdAt",
        filters = [],
        onlyPublished = true
      } = {}
    ) {
      const opts = { page, pageSize, order, sortBy, filters, onlyPublished }
      const options = getOptionString(opts)
      const filterString = getBracketedFilterString(opts)
      let query = `
        query GetUsers {
          allUsers(where: {slug: "${slug}"}) {
            id
            slug
            name
            content
            image {
              originalFilename
              publicUrl
            }
            posts${options} {
              id
              slug
              title
              excerpt
              commentable
              content
              publishedAt
              author {
                id
                name
                slug
              }
              image {
                path
                originalFilename
                publicUrl
              }
              categories {
                id
                name
                slug
              }
              tags {
                id
                name
                slug
              }
            }
            _postsMeta${filterString} {
              count
            }
          }
        }`
      const { data } = await this.fetch(query)
      const allUsers = data.allUsers
      if (!Array.isArray(allUsers) || allUsers.length === 0) {
        throw "not found"
      }
      const user = allUsers[0]
      const userPostsCount = user._postsMeta.count
      const pagination = getPagination({ page, pageSize }, userPostsCount)
      return {
        user: user,
        posts: user.posts,
        meta: {
          pagination: pagination,
          order: order ? order : "ASC",
          sortBy: sortBy ? sortBy : null
        }
      }
    },
    fetchPostBySlug: async function(slug, onlyIfActive = true) {
      let filterString = `where: {slug: "${slug}"`
      if (onlyIfActive) {
        filterString += `, state_in: published`
      }
      filterString += `}`
      let query = `
        query getPost {
          allPosts(${filterString}) {
            id
            slug
            title
            excerpt
            commentable
            content
            publishedAt
            author {
              id
              name
              slug
            }
            image {
              path
              originalFilename
              publicUrl
            }
            categories {
              id
              name
              slug
            }
            tags {
              id
              name
              slug
            }
            comments(where: {state: published}) {
              createdAt
              content
            }
          }
        }`
      const { data } = await this.fetch(query)
      const allPosts = data.allPosts
      if (!Array.isArray(allPosts) || allPosts.length === 0) {
        throw "not found"
      }
      const post = allPosts[0]
      return {
        post: post
      }
    }
  }
  inject("graphqlClient", graphqlClient)
}
