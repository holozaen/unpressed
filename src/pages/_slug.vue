<template>
  <LayoutSidebarRight>
    <div class="w-full p-6" v-if="post">
      <section class="w-full mb-4">
        <PostCategoriesView :categories="post.categories"></PostCategoriesView>
        <h1 class="text-4xl font-bold">{{ post.title }}</h1>
        <PostMetaView
          :author="post.author"
          :published-at="post.publishedAt"
          :tags="post.tags"
        ></PostMetaView>
      </section>
      <section class="w-full std">
        <PostImageView :image="post.image" :float="true"></PostImageView>
        <div v-html="post.content"></div>
      </section>
    </div>
    <div slot="sidebar" class="w-full">
      <Widget>
        <template slot="title">Sample Widget</template>
        Some content
      </Widget>
    </div>
  </LayoutSidebarRight>
</template>

<script>
import Widget from "../components/layout/utils/Widget"
import LayoutSidebarRight from "../components/layout/LayoutSidebarRight"
import htmlCleanerMixin from "../mixins/htmlCleanerMixin"
import PostCategoriesView from "../components/post/details/PostCategoriesView"
import PostImageView from "../components/post/details/PostImageView"
import PostMetaView from "../components/post/details/PostMetaView"

export default {
  name: "PostView",
  components: {
    PostMetaView,
    PostImageView,
    PostCategoriesView,
    Widget,
    LayoutSidebarRight
  },
  mixins: [htmlCleanerMixin],
  head() {
    return {
      title: this.post
        ? this.post.metaTitle
          ? this.post.metaTitle
          : this.post.title
        : "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.post
            ? this.post.metaDescription
              ? this.post.metaDescription
              : this.shorten(this.stripTags(this.post.content), 320)
            : ""
        }
      ]
    }
  },
  async asyncData({ app, params }) {
    const slug = params.slug
    try {
      return await app.$graphqlClient.fetchPostBySlug(slug)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
