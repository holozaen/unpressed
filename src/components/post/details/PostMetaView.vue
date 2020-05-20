<template>
  <div>
    <div v-if="author" class="text-sm pb-3 inline mr-2">
      Von
      <nuxt-link
        :to="'/author/' + author.slug"
        class="font-semibold hover:text-gray-800"
      >
        {{ author.name }}
      </nuxt-link>
      <span v-if="localeDate">, publiziert am {{ localeDate }}</span>
    </div>
    <div v-if="tags" class="inline text-xs">
      Tags:
      <nuxt-link
        v-for="tag in tags"
        :key="tag.slug"
        :to="'/tag/' + tag.slug"
        :title="tag.name"
        class="text-primary-700 hover:bg-gray-400 rounded py-1 px-2"
      >
        {{ tag.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostMetaView",
  props: ["author", "publishedAt", "tags"],
  computed: {
    localeDate() {
      if (!this.publishedAt) {
        return null
      }
      const date = new Date(this.publishedAt)
      return date.toLocaleDateString()
    }
  }
}
</script>
