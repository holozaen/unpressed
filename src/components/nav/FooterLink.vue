<template>
  <nuxt-link :to="target" :title="title" class="uppercase px-3"><slot></slot></nuxt-link>
</template>

<script>
export default {
  name: "FooterLink",
  props: {
    target: {
      type: String,
      required: true
    },
    title: {
      Type: String,
      required: false,
      default: ""
    }
  }
}
</script>
