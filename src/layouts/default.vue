<template>
  <div>
    <top-nav></top-nav>
    <top-title class="my-6 md:my-12"></top-title>
    <main-nav></main-nav>
    <main-container class="md:my-6">
      <nuxt/>
    </main-container>
    <Footer></Footer>
  </div>

</template>

<script>
import TopNav from "./partials/topNav"
import TopTitle from "./partials/topTitle"
import MainNav from "./partials/mainNav"
import Footer from "./partials/Footer"
import MainContainer from "./partials/mainContainer"
import { addBackToTop } from "vanilla-back-to-top"
import { theme } from '../tailwind.config'
export default {
  name: "default",
  components: {MainContainer, Footer, MainNav, TopTitle, TopNav},
  mounted() {
    addBackToTop({
      backgroundColor: theme.extend.colors.primary[700],
      showWhenScrollTopIs: 300
    })
  }
}
</script>
<style>
  body{
    font-family: karla, "Open Sans", Helvetica, Arial, sans-serif;
  }
</style>
