<template>
  <div
    v-if="image"
    :class="{
      'sm:m-auto w-full sm:max-w-xs': !stretch,
      'w-full sm:max-w-xs sm:float-left pb-2 pr-4': float,
      'sm:pt-4': !float
    }"
  >
    <nuxt-link :to="linkTo" v-if="linkTo">
      <img
        :src="image.publicUrl"
        :alt="image.originalFilename"
        class="hover:opacity-75 w-full"
      />
    </nuxt-link>
    <img
      v-else
      :src="image.publicUrl"
      :alt="image.originalFilename"
      class="hover:opacity-75 w-full"
    />
  </div>
</template>

<script>
export default {
  name: "PostImageView",
  components: {},
  props: {
    image: {
      type: Object,
      required: false,
      default: null
    },
    linkTo: {
      type: String,
      required: false,
      default: null
    },
    stretch: {
      type: Boolean,
      required: false,
      default: false
    },
    float: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
