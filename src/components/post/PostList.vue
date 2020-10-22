<template>
  <div class="w-full">
    <template v-if="posts && posts.length > 0">
      <PostListItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :show-author="showAuthor"
        :show-categories="showCategories"
        :show-tags="showTags"
      ></PostListItem>
      <Pagination
        :pagination="postsMeta.pagination"
        :order="postsMeta.order"
        :sort-by="postsMeta.sortBy"
      ></Pagination>
    </template>
    <template v-else>
      <article class="flex flex-col shadow my-4">
        Leider keine Artikel gefunden.
      </article>
    </template>
  </div>
</template>

<script>
import PostListItem from "./PostListItem"
import Pagination from "../Utilities/Pagination"
export default {
  name: "PostList",
  components: { Pagination, PostListItem },
  props: {
    posts: {
      type: Array,
      required: false
    },
    postsMeta: {
      type: Object,
      required: true
    },
    showTags: {
      type: Boolean,
      required: false,
      default: true
    },
    showCategories: {
      type: Boolean,
      required: false,
      default: true
    },
    showAuthor: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>
