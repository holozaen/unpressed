<template>
  <nav class="w-full py-4 shadow bg-primary-800">
    <div class="w-full container mx-auto flex flex-wrap items-center justify-between">
      <nav>
        <ul class="mb-2 sm:mb-0 sm:flex flex-wrap items-center justify-between font-bold text-sm text-white uppercase no-underline">
          <TopNavigationLink v-for="page in pages" :key="page.slug" :target="'/page/' + page.slug" :title="page.title">{{ page.title }}</TopNavigationLink>
        </ul>
      </nav>
      <div class="flex items-center text-lg no-underline text-white pr-6">
        <Share></Share>
      </div>
    </div>

  </nav></template>

<script>
import TopNavigationLink from "../../components/nav/TopNavigationLink"
import Share from "./Share"
export default {
  name: "topNav",
  components: {Share, TopNavigationLink},
  computed: {
    pages() {
      return this.$store.getters['page/top']
    }
  }
}
</script>
