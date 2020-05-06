<template>
  <client-only>
    <social-sharing
      class="social-buttons"
      :url="path"
      :title="meta.title"
      :description="meta.title"
      :hashtags="hashtags"
      :media="meta.image"
      inline-template
      @open="sharing"
    >
      <div>
        <network network="facebook" class="facebook ml-6">
          <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
        </network>
        <network network="twitter" class="twitter ml-6">
          <font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon>
        </network>
        <network network="pinterest" class="pinterest ml-6">
          <font-awesome-icon :icon="['fab', 'pinterest']"></font-awesome-icon>
        </network>
        <network network="email" class="email ml-6">
          <font-awesome-icon icon="envelope"></font-awesome-icon>
        </network>
      </div>
    </social-sharing>
  </client-only>
</template>

<script>
import layoutMetaMixin from "../../mixins/layoutMetaMixin"

export default {
  name: "Share",
  mixins: [layoutMetaMixin],
  computed: {
    hashtags() {
      return process.env.SOCIAL_GENERAL_HASHTAGS
    },
    path() {
      return process.env.APP_URL + this.$route.fullPath
    }
  },
  methods: {
    sharing(network) {
      this.trackSocialAction(network, this.meta.title + ' - shared on ' + network)
    }
  }
}
</script>
<style type="text/css">
  .social-buttons span {
    display: inline-block;
    cursor: pointer;
  }
</style>
