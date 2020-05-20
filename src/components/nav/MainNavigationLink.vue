<template>
  <nuxt-link
    :to="target"
    :title="title"
    class="hover:bg-gray-400 rounded py-2 px-4 mx-2"
  >
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  name: "MainNavigationLink",
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
