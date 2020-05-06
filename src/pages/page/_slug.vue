<template>
  <LayoutSingleColumn>
    <article class="flex flex-col my-4 w-full">
      <div class="bg-white flex flex-col justify-start p-6 std">
        <h1 class="text-3xl font-bold pb-4">{{page.title}}</h1>
        <div v-html="page.content"></div>
        </div>
    </article>
  </LayoutSingleColumn>
</template>

<script>
import LayoutSingleColumn from "../../components/layout/LayoutSingleColumn"
import htmlCleanerMixin from "../../mixins/htmlCleanerMixin"
export default {
  name: "PageView",
  components: {LayoutSingleColumn},
  mixins: [htmlCleanerMixin],
  head() {
    return {
      title: this.page ? this.page.metaTitle ? this.page.metaTitle : this.page.title : '',
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page ? this.page.metaDescription ? this.page.metaDescription : this.shorten(this.stripTags(this.page.content), 320): ''
        }
      ],
    }
  },
  computed: {
    page() {
      return this.$store.getters['page/slug'](this.$route.params.slug)
    }
  }
}
</script>
