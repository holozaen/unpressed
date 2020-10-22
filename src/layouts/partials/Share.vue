<template>
  <client-only>
    <div class="social-buttons">
      <ShareNetwork
        network="facebook"
        class="facebook ml-6"
        :url="path"
        :title="meta.title"
        :description="meta.title"
        :hashtags="hashtags"
        :media="meta.image"
        @open="sharing"
      >
        <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
      </ShareNetwork>
      <ShareNetwork
        network="twitter"
        class="twitter ml-6"
        :url="path"
        :title="meta.title"
        :description="meta.title"
        :hashtags="hashtags"
        :media="meta.image"
        @open="sharing"
      >
        <font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon>
      </ShareNetwork>
      <ShareNetwork
        network="pinterest"
        class="pinterest ml-6"
        :url="path"
        :title="meta.title"
        :description="meta.title"
        :hashtags="hashtags"
        :media="meta.image"
        @open="sharing"
      >
        <font-awesome-icon :icon="['fab', 'pinterest']"></font-awesome-icon>
      </ShareNetwork>
      <ShareNetwork
        network="email"
        class="email ml-6"
        :url="path"
        :title="meta.title"
        :description="meta.title"
        :hashtags="hashtags"
        :media="meta.image"
        @open="sharing"
      >
        <font-awesome-icon icon="envelope"></font-awesome-icon>
      </ShareNetwork>
    </div>
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
      this.trackSocialAction(
        network,
        this.meta.title + " - shared on " + network
      )
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
