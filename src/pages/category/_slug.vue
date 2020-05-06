<template>
  <LayoutSidebarRight>
    <div class="w-full p-6 pb-0">
      <h1 class="text-4xl font-bold">{{ category.name }}</h1>
      <div v-html="category.content" class="pt-6" v-if="category.content"></div>
    </div>
    <PostList :posts="category.posts" v-if="category.posts" :show-categories="false"></PostList>
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
  name: "CategoryView",
  components: {Widget, PostList, LayoutSidebarRight},
  mixins: [htmlCleanerMixin],
  head() {
    return {
      title: this.category ? this.category.metaTitle ? this.category.metaTitle : this.category.name : '',
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.category ? this.category.metaDescription ? this.category.metaDescription : this.shorten(this.stripTags(this.category.content), 320) : ''
        }
      ],
    }
  },
  async asyncData({app, params}) {
    const slug = params.slug
    try {
      return await app.$graphqlClient.fetchCategoryBySlug(slug)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
