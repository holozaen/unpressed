<template>
  <div v-if="pagination && showPagination">
    <div
      class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    >
      <div class="flex-1 flex justify-between sm:hidden">
        <nuxt-link
          tag="button"
          v-if="pagination.currentPage !== 1"
          :to="getLink('previous')"
          class="relative inline-flex items-center px-4 py-2 border border-primary-700 text-sm leading-5 font-medium text-primary-700 bg-white hover:text-white hover:bg-primary-700 focus:outline-none focus:shadow-outline-primary focus:border-primary-700 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
          Vorherige
        </nuxt-link>
        <nuxt-link
          tag="button"
          v-if="pagination.currentPage !== pagination.lastPage"
          :to="getLink('next')"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-primary-700 disabled:text-gray-200 text-sm leading-5 font-medium text-primary-700 bg-white hover:text-white hover:bg-primary-700 focus:outline-none focus:shadow-outline-primary focus:border-blue-primary active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
          Nächste
        </nuxt-link>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm leading-5 text-gray-700">
            Zeige
            <span class="font-medium">{{ pagination.from }}</span>
            bis
            <span class="font-medium">{{ pagination.to }}</span>
            von
            <span class="font-medium">{{ pagination.total }}</span>
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex shadow-sm">
            <nuxt-link
              tag="button"
              :disabled="pagination.currentPage === 1"
              :to="getLink('previous')"
              class="relative inline-flex items-center px-2 py-2 border border-primary-700 bg-white text-sm leading-5 font-medium text-primary-700 hover:text-white hover:bg-primary-700 disabled:text-gray-200 focus:z-10 focus:outline-none focus:border-primary-300 focus:shadow-outline-primary active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Previous"
            >
              <!-- Heroicon name: chevron-left -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </nuxt-link>
            <nuxt-link
              v-for="page in pages"
              :to="getLink(page)"
              tag="button"
              :key="page"
              class="-ml-px relative inline-flex items-center px-4 py-2 border border-primary-700 bg-white text-sm leading-5 font-medium text-primary-700 hover:text-white hover:bg-primary-700 disabled:text-gray-200 focus:z-10 focus:outline-none focus:border-primary-300 focus:shadow-outline-primary active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              :disabled="isCurrentPage(page)"
            >
              {{ page }}
            </nuxt-link>
            <nuxt-link
              tag="button"
              :disabled="pagination.currentPage === pagination.lastPage"
              :to="getLink('next')"
              class="-ml-px relative inline-flex items-center px-2 py-2 border border-primary-700 bg-white text-sm leading-5 font-medium text-primary-700 hover:text-white hover:bg-primary-700 focus:z-10 focus:outline-none disabled:text-gray-200 focus:border-primary-300 focus:shadow-outline-primary active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Next"
            >
              <!-- Heroicon name: chevron-right -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </nuxt-link>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  components: {},
  props: {
    pagination: {
      type: Object
    },
    offset: {
      default: 5
    },
    order: {
      type: String,
      required: false,
      default: "DESC"
    },
    sortBy: {
      type: String,
      required: false,
      default: "createdAt"
    }
  },
  computed: {
    query() {
      return {
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        sortBy: this.sortBy,
        order: this.order
      }
    },
    pages() {
      let pages = []
      let from = this.pagination.currentPage - Math.floor(this.offset / 2)
      if (from < 1) {
        from = 1
      }
      let to = from + this.offset - 1
      if (to > this.pagination.lastPage) {
        to = this.pagination.lastPage
      }
      while (from <= to) {
        pages.push(from)
        from++
      }
      return pages
    },
    showPagination() {
      return this.pagination.lastPage > 1
    },
    currentPath() {
      return this.$router.currentRoute.path
    }
  },
  methods: {
    getQueryString(query) {
      return new URLSearchParams(query).toString()
    },
    getLink(page) {
      let query = JSON.parse(JSON.stringify(this.query))
      if (page === "next") {
        query.page = query.page + 1
      } else if (page === "previous") {
        query.page = query.page - 1
      } else {
        query.page = page
      }
      return this.currentPath + "?" + this.getQueryString(query)
    },
    isCurrentPage(page) {
      return this.pagination.currentPage === page
    }
  }
}
</script>
