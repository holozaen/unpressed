<template>
  <li><nuxt-link :to="target" :title="title" class="hover:text-gray-200 hover:underline px-4"><slot></slot></nuxt-link></li>
</template>

<script>
export default {
  name: "TopNavigationLink",
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
