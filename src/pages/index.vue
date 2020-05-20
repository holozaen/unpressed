<template>
  <LayoutSidebarRight>
    <PostList v-if="posts" :posts="posts"></PostList>
    <div slot="sidebar" class="w-full">
      <Widget>
        <template slot="title">Sample Widget</template>
        Some content
      </Widget>
    </div>
  </LayoutSidebarRight>
</template>

<script>
import PostList from "../components/post/PostList"
import LayoutSidebarRight from "../components/layout/LayoutSidebarRight"
import Widget from "../components/layout/utils/Widget"

export default {
  components: { Widget, LayoutSidebarRight, PostList },
  layout: "default",
  head: {
    title: process.env.APP_TITLE,
    meta: [
      {
        hid: "description",
        name: "description",
        content: process.env.APP_DESCRIPTION
      }
    ]
  },
  data() {
    return {
      posts: null
    }
  },
  async asyncData({ app }) {
    try {
      return await app.$graphqlClient.fetchPosts()
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
