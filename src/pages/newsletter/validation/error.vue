<template>
  <LayoutSingleColumn>
    <article class="flex flex-col my-4 w-full">
      <div class="bg-white flex flex-col justify-start p-6 std">
        <h1 class="text-3xl font-bold pb-4">Fehler</h1>
        <div>
          <p>
            Ihre E-Mail-Adresse konnte nicht bestätigt werden. Bitte wenden Sie
            sich ggf. via Mail oder Telefon an uns.
          </p>
          <p>Sie werden in wenigen Momenten zur Home Page weitergeleitet...</p>
        </div>
      </div>
    </article>
  </LayoutSingleColumn>
</template>

<script>
import LayoutSingleColumn from "../../../components/layout/LayoutSingleColumn"
export default {
  name: "error",
  components: { LayoutSingleColumn },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        location.assign("/")
      }, 4000)
    })
  }
}
</script>
