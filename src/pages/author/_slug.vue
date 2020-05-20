<template>
  <LayoutSidebarRight>
    <section class="w-full p-6">
      <h1 class="text-4xl font-bold pb-4">{{ user.name }}</h1>
      <div class="sm:flex flex-row flex-row">
        <div
          v-if="user.image"
          class="mb-2 sm:mb-0 w-full sm:w-1/12 mr-4 pt-2 min-w-3"
        >
          <img
            :src="user.image.publicUrl"
            :alt="user.image.originalFilename"
            class="rounded-full"
          />
        </div>
        <div class="flex-grow" v-html="user.content"></div>
      </div>
    </section>
    <section class="w-full">
      <PostList :posts="user.posts" v-if="user.posts"></PostList>
    </section>
    <div slot="sidebar" class="w-full">
      <Widget>
        <template slot="title">Sample Widget</template>
        Some content
      </Widget>
    </div>
  </LayoutSidebarRight>
</template>

<script>
import LayoutSidebarRight from "../../components/layout/LayoutSidebarRight"
import PostList from "../../components/post/PostList"
import Widget from "../../components/layout/utils/Widget"
import htmlCleanerMixin from "../../mixins/htmlCleanerMixin"
export default {
  name: "AuthorView",
  components: { Widget, PostList, LayoutSidebarRight },
  mixins: [htmlCleanerMixin],
  head() {
    return {
      title: this.user.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.user
            ? this.shorten(this.stripTags(this.user.content), 320)
            : ""
        }
      ]
    }
  },
  async asyncData({ app, params }) {
    const slug = params.slug
    try {
      return await app.$graphqlClient.fetchUserBySlug(slug)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
