<template>
  <div v-if="doShow">
    <nuxt-link
      v-for="category in categories"
      :key="category.slug"
      :to="'/category/' + category.slug"
      :title="category.name"
      class="text-primary-700 text-sm font-bold uppercase pb-4 mr-2"
    >
      {{ category.name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "PostCategoriesView",
  components: {},
  props: ["categories"],
  computed: {
    doShow() {
      if (!Array.isArray(this.categories)) {
        return false
      }
      return this.categories.length !== 0
    }
  }
}
</script>
