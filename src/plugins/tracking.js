import Vue from "vue"

const tracking = {
  methods: {
    trackPageView() {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.page(this.$router)
      }
    },
    trackAction(category, action, label, value = 0) {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.event({
          eventCategory: category,
          eventAction: action,
          eventLabel: label,
          eventValue: value
        })
      }
    },
    trackError(msg) {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.event({
          eventCategory: "error",
          eventAction: "thrown",
          eventLabel: msg,
          eventValue: 0
        })
      }
    },
    trackCartAction(action, label, value = 0) {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.event({
          eventCategory: "cart",
          eventAction: action,
          eventLabel: label,
          eventValue: value
        })
      }
    },
    trackSocialAction(network, label, value = 0) {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.event({
          eventCategory: "social",
          eventAction: network,
          eventLabel: label,
          eventValue: value
        })
      }
    },
    trackAccountAction(action, label, value = 0) {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.event({
          eventCategory: "account",
          eventAction: action,
          eventLabel: label,
          eventValue: value
        })
      }
    },
    trackSearchAction(action, label, value = 0) {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.event({
          eventCategory: "search",
          eventAction: action,
          eventLabel: label,
          eventValue: value
        })
      }
    },
    trackListAction(action, label) {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.event({
          eventCategory: "list",
          eventAction: "change",
          eventLabel: label,
          eventValue: 0
        })
      }
    },
    trackButtonClick(label, value = 0) {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.event({
          eventCategory: "button",
          eventAction: "click",
          eventLabel: label,
          eventValue: value
        })
      }
    },
    trackLinkClick(label, value = 0) {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.event({
          eventCategory: "link",
          eventAction: "click",
          eventLabel: label,
          eventValue: value
        })
      }
    },
    trackModalOpen(title) {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.event({
          eventCategory: "modal",
          eventAction: "open",
          eventLabel: title,
          eventValue: 0
        })
      }
    },
    trackModalClose(title) {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.event({
          eventCategory: "modal",
          eventAction: "close",
          eventLabel: title,
          eventValue: 0
        })
      }
    },
    trackFormInput(field, value = 0) {
      if (this.$store.getters["analytics/trackingEnabled"]) {
        this.$ga.event({
          eventCategory: "form",
          eventAction: "input",
          eventLabel: field,
          eventValue: value
        })
      }
    }
  }
}

Vue.mixin(tracking)
