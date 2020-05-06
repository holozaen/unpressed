<template>
  <transition name="page">
    <footer class="w-full border-t bg-white pb-12" v-if="!$store.getters['loading']">
      <div class="w-full container mx-auto flex flex-col items-center">
        <div class="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
          <FooterLink v-for="page in pages" :key="page.slug" :target="'/page/' + page.slug" :title="page.title">{{ page.title }}</FooterLink>
        </div>
        <div class="uppercase pb-6">&copy; <a :href="copyrightUrl" rel="noopener" target="_blank">{{ copyright }}</a></div>
      </div>
    </footer>
  </transition>
</template>

<script>
import FooterLink from "../../components/nav/FooterLink"
export default {
  name: "Footer",
  components: {FooterLink},
  computed: {
    copyright() {
      return process.env.APP_COPYRIGHT ? process.env.APP_COPYRIGHT : process.env.APP_TITLE
    },
    copyrightUrl() {
      return process.env.APP_COPYRIGHT_URL ? process.env.APP_COPYRIGHT_URL : '#'
    },
    pages() {
      return this.$store.getters['page/bottom']
    }
  }
}
</script>
