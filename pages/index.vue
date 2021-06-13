<template>
  <div class="min-h-screen w-full h-full bg-gray-800">
    <div class="container mx-auto p-5 space-y-5">

      <!-- Search Bar Section -->
        <SearchBar />

        <!-- Pokemon List Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <HomeCard class="opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer" v-for="pokemon in pokemonList" :key="pokemon.id" :pokemon="pokemon" />
        </div>

        <!-- Page Navigation Section -->
        <div class="flex justify-between">

          <div @click="prevPage()" :class="{'invisible': currentPage === 1, 'bg-gray-700 p-2 rounded-lg text-gray-100 flex items-center cursor-pointer': currentPage > 1}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <p class="font-bold">Previous</p>
          </div>

          <div @click="nextPage()" :class="{'invisible': currentPage === 70, 'bg-gray-700 p-2 rounded-lg text-gray-100 flex items-center cursor-pointer': currentPage < 70}">
            <p class="font-bold">Next</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          
        </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  created() {
    this.$store.dispatch('fetchPokemon', this.currentPage)
  },
  computed: {
    pokemonList () {
      return this.$store.state.pokemonList
    }
  },
  methods: {
    prevPage() {
      this.currentPage -= 1
      this.$store.dispatch('fetchPokemon', this.currentPage)
    },
    nextPage() {
      this.currentPage += 1
      this.$store.dispatch('fetchPokemon', this.currentPage)
    }
  }
}
</script>

<style>

</style>