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
export default {
  name: "PostList",
  components: { PostListItem },
  props: {
    posts: {
      type: Array,
      required: false
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
