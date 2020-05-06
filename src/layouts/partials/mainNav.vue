<template>
  <nav class="w-full py-4 border-t border-b bg-gray-200" v-model="open">
    <div class="block sm:hidden">
      <a
          href="#"
          class="block md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
          @click="open = !open"
      >
        Kategorie <i :class="open ? 'fa-chevron-down': 'fa-chevron-up'" class="fas ml-2"></i>
      </a>
    </div>
    <div :class="open ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
      <div class="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
        <MainNavigationLink v-for="cat in categories" :key="cat.slug" :target="'/category/' + cat.slug" :title="cat.name">{{ cat.name }}</MainNavigationLink>
      </div>
    </div>
  </nav></template>

<script>
import MainNavigationLink from "../../components/nav/MainNavigationLink"
export default {
  name: "mainNav",
  components: {MainNavigationLink},
  data() {
    return {
      open: false
    }
  },
  computed: {
    categories() {
      return this.$store.getters['category/navigationList']
    }
  }
}
</script>
