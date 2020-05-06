<template>
  <LayoutSidebarRight>
    <div class="w-full p-6">
      <h1 class="text-4xl font-bold">{{ tag.name }}</h1>
      <div class="pt-6" v-if="tag.content">
        <div v-html="tag.content"></div>
      </div>
    </div>

    <PostList :posts="tag.posts" v-if="tag.posts"></PostList>
    <div slot="sidebar" class="w-full">
      <Widget>
        <template slot="title">Sample Widget</template>
        Some content
      </Widget>
    </div>
  </LayoutSidebarRight>
</template>

<script>
import Widget from "../../components/layout/utils/Widget"
import PostList from "../../components/post/PostList"
import LayoutSidebarRight from "../../components/layout/LayoutSidebarRight"
import htmlCleanerMixin from "../../mixins/htmlCleanerMixin"

export default {
  name: "TagView",
  components: {SpFeedRssViewer, Widget, PostList, LayoutSidebarRight},
  mixins: [htmlCleanerMixin],
  head() {
    return {
      title: this.tag ? this.tag.metaTitle ? this.tag.metaTitle : this.tag.name : '',
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.tag ? this.tag.metaDescription ? this.tag.metaDescription : this.shorten(this.stripTags(this.tag.content), 320) : ''
        }
      ],
    }
  },
  async asyncData({app, params}) {
    const slug = params.slug
    try {
      return await app.$graphqlClient.fetchTagBySlug(slug)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
