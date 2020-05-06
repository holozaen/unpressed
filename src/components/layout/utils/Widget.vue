<template>
  <div class="w-full bg-white shadow flex flex-col my-4 p-6">
    <p class="text-xl font-semibold pb-5" v-if="hasTitleSlot"><slot name="title">RSS</slot></p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Widget",
  computed: {
    hasTitleSlot () {
      return !!this.$slots['title']
    },
  }
}
</script>
