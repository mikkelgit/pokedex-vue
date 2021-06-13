<template>
  <div class="min-h-screen w-full h-full bg-gray-800">
    <div class="container mx-auto lg:p-5 p-3 h-full">
      <!-- Fetching data -->
      <div class="h-full" v-if="this.loading">
        <div class="flex items-center justify-center">
          <p class="text-2xl font-bold animate-pulse text-gray-100">Loading . . .</p>
        </div>
      </div>

      <!-- Data loaded -->
      <div v-else class="p-3 lg:max-w-screen-lg mx-auto flex flex-col items-center bg-gray-300 shadow-lg lg:p-3 rounded-xl">
        
        <!-- Top Section -->
        <div class="flex w-full items-center space-x-3">
          <NuxtLink to='/' class="bg-gray-200 bg-opacity-0 hover:bg-opacity-100 transition cursor-pointer duration-300 rounded-full justify-center items-center p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </NuxtLink>
          <p class="capitalize text-2xl font-bold text-center text-gray-700">{{this.detail.name}}</p>
        </div>

        <!-- Image Section -->
        <div class="bg-gray-800 rounded-full">
          <img class="w-32" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + this.detail.id + '.png'" alt="">
        </div>

        <!-- Pokemon Detail Section -->
        <div class="rounded-xl p-3 w-full my-6 shadow-lg">

          <!-- Detail Tabs -->
          <ul class="md:flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
              <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" @click="toggleTabs(1)" v-bind:class="{'text-gray-700 bg-gray-100': openTab !== 1, 'text-gray-100 bg-gray-700': openTab === 1}">
                Info
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
              <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" @click="toggleTabs(2)" v-bind:class="{'text-gray-700 bg-gray-100': openTab !== 2, 'text-gray-100 bg-gray-700': openTab === 2}">
                Moves
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
              <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" @click="toggleTabs(3)" v-bind:class="{'text-gray-700 bg-gray-100': openTab !== 3, 'text-gray-100 bg-gray-700': openTab === 3}">
                Stats
              </a>
            </li>
          </ul>

          <!-- Pokemon Detail Container -->
          <div class="px-4 py-5 flex-auto">
            <div class="tab-content tab-space">

              <!-- Pokemon Info -->
              <div :class="{'hidden': openTab !== 1, 'block space-y-3 divide-y-2 divide-dashed': openTab === 1}">
                <div class="flex justify-between">
                  <p>Base Experience</p>
                  <p>{{ this.detail.base_experience }} XP</p>
                </div>
                <div class="flex justify-between">
                  <p>Height</p>
                  <p>{{ this.detail.height }} m</p>
                </div>
                <div class="flex justify-between">
                  <p>Weight</p>
                  <p>{{ this.detail.weight }} kg</p>
                </div>
              </div>

              <!-- Pokemon Move -->
              <div :class="{'hidden': openTab !== 2, 'block space-y-3 md:space-y-0 h-32 overflow-y-auto md:gap-3 md:grid md:grid-cols-4': openTab === 2}">
                <div class="bg-gray-700 text-white rounded-full text-center capitalize flex items-center justify-center" v-for="moveData in this.detail.moves" :key="moveData.move.name">
                  <p>{{moveData.move.name}}</p>
                </div>
              </div>

              <!-- Pokemon Stats -->
              <div :class="{'hidden': openTab !== 3, 'block space-y-3 divide-y-2 divide-dashed': openTab === 3}">
                <div v-for="statsData in this.detail.stats" :key="statsData.stat.name" class="flex justify-between">
                  <p class="capitalize">{{statsData.stat.name}}</p>
                  <p>{{ statsData.base_stat }}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Pokemon Evolution Chain -->
        <div class="flex justify-around w-full lg:px-32">
          <div class="bg-gray-700 px-4 py-2 rounded-lg font-bold text-white" v-if="this.detail.species && this.detail.species.name !== this.pokemonEvolution.chain.species.name">
            <NuxtLink class="capitalize text-gray-100" :to="'/pokemon/' + this.pokemonEvolution.chain.species.url.split('/').filter(string => string).pop()">
              {{this.pokemonEvolution.chain.species.name}}
            </NuxtLink>
          </div>

          <div class="bg-gray-700 px-4 py-2 rounded-lg font-bold text-white" v-if="this.detail.species && this.pokemonEvolution.chain.evolves_to[0] && this.detail.species.name !== this.pokemonEvolution.chain.evolves_to[0].species.name">
            <NuxtLink class="capitalize text-gray-100" :to="'/pokemon/' + this.pokemonEvolution.chain.evolves_to[0].species.url.split('/').filter(string => string).pop()">
              {{this.pokemonEvolution.chain.evolves_to[0].species.name}}
            </NuxtLink>
          </div>

          <div class="bg-gray-700 px-4 py-2 rounded-lg font-bold text-white" v-if="this.detail.species && this.pokemonEvolution.chain.evolves_to[0] && this.pokemonEvolution.chain.evolves_to[0].evolves_to[0] && this.detail.species.name !== this.pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.name">
            <NuxtLink class="capitalize text-gray-100" :to="'/pokemon/' + this.pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.url.split('/').filter(string => string).pop()">
              {{this.pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.name}}
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      loading: true,
      openTab: 1,
      pokemonEvolution: {}
    }
  },
  async mounted () {
    try {
      this.loading = true
      const detailResponse = await this.$axios('https://pokeapi.co/api/v2/pokemon/' + this.$route.params.id)
      this.detail = detailResponse.data

      const evolutionUrl = await this.$axios(this.detail.species.url)

      const evolutionDetail = await this.$axios(evolutionUrl.data.evolution_chain.url)

      this.pokemonEvolution = evolutionDetail.data

      this.loading = false
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    toggleTabs (tabNumber){
      this.openTab = tabNumber
    }
  }
}
</script>

<style>

</style>