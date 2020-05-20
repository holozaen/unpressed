<template>
  <article class="flex flex-col shadow my-4">
    <!-- Article Image -->
    <PostImageView
      :image="post.image"
      :link-to="'/' + post.slug"
      :stretch="false"
    ></PostImageView>
    <div class="bg-white flex flex-col justify-start p-6">
      <template v-if="showCategories">
        <PostCategoriesView :categories="post.categories"></PostCategoriesView>
      </template>
      <h2 class="text-3xl font-bold hover:text-gray-700 pb-4">
        <nuxt-link :to="'/' + post.slug">{{ post.title }}</nuxt-link>
      </h2>
      <PostMetaView
        v-if="showMeta"
        :author="post.author"
        :published-at="post.publishedAt"
        :tags="post.tags"
        class="mb-2"
      ></PostMetaView>
      <nuxt-link :to="'/' + post.slug" class="pb-6 std">
        <div v-html="this.excerpt"></div>
      </nuxt-link>
      <nuxt-link
        :to="'/' + post.slug"
        class="uppercase text-gray-800 hover:text-black"
      >
        Weiterlesen
        <font-awesome-icon icon="arrow-right"></font-awesome-icon>
      </nuxt-link>
    </div>
  </article>
</template>

<script>
import PostCategoriesView from "./details/PostCategoriesView"
import htmlCleanerMixin from "../../mixins/htmlCleanerMixin"
import PostImageView from "./details/PostImageView"
import PostMetaView from "./details/PostMetaView"
export default {
  name: "PostListItem",
  components: { PostMetaView, PostImageView, PostCategoriesView },
  mixins: [htmlCleanerMixin],
  props: {
    post: {
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
    showMeta: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    excerpt() {
      if (this.post.excerpt) {
        return this.shorten(this.post.excerpt, 600)
      }
      return this.shorten(this.post.content, 600)
    }
  }
}
</script>
