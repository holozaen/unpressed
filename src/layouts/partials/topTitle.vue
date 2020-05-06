<template>
  <header class="w-full container mx-auto">
    <div class="flex flex-col items-center px-6">
      <nuxt-link class="font-bold text-gray-800 uppercase hover:text-gray-700 text-xl sm:text-2xl md:text-4xl lg:text-5xl" to="/">
        <h1 v-if="isHomePage">{{ title }}</h1>
        <template v-else>{{ title }}</template>
      </nuxt-link>
      <p class="text-sm sm:text-lg text-gray-600 text-center">
        {{ claim }}
      </p>
    </div>
  </header>
</template>

<script>
export default {
  name: "topTitle",
  computed: {
    isHomePage() {
      return this.$route.name === 'index'
    },
    title() {
      return process.env.APP_TITLE
    },
    claim() {
      return process.env.APP_CLAIM
    }
  }
}
</script>
