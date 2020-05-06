<template>
  <div class="flex flex-wrap w-full">
    <section class="w-full md:w-2/3 flex flex-col items-center md:pr-3">
      <slot></slot>
    </section>
    <aside class="w-full md:w-1/3 flex flex-col items-center">
      <slot name="sidebar"></slot>
    </aside>
  </div>
</template>

<script>
import Widget from "./utils/Widget"
export default {
  name: "LayoutSidebarRight",
  components: {Widget}
}
</script>
