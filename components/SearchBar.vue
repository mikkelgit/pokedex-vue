<template>
    <div class="max-w-screen-md mx-auto">
      <div class="bg-gray-200 border-2 border-gray-700 p-3 rounded-2xl px-5 w-full relative">
        <div class="flex">

            <!-- Input Section -->
            <input v-model="input" class="bg-transparent focus:outline-none w-full" type="text" placeholder="Find Pokemon (min. 4 Chars)">
            <div @click="findPokemon()" class="cursor-pointer p-1 bg-gray-50 bg-opacity-0 hover:bg-opacity-100 transition duration-300 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            
        </div>

        <!-- Results Section -->
        <div class="absolute z-10 bg-gray-100 border-2 border-gray-700 w-full left-0 space-y-3 rounded-lg p-3" v-if="input.length && foundPokemons.length">
            <div v-for="pokemon in foundPokemons" :key="pokemon[1]">
                <p class="capitalize cursor-pointer" @click="goToDetail(pokemon[1])" >{{pokemon[0]}}</p>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            input: ''
        }
    },
    methods: {
        findPokemon() {
            if (this.input.length >= 4) {
                this.$store.dispatch('findPokemon', this.input)
            }
        },
        goToDetail(id) {
            this.input = ''
            this.$router.push('/pokemon/' + id)
        }
    },
    computed: {
        foundPokemons () {
            return this.$store.state.foundPokemons
        }
    },
    watch: {
        input() {
            if (this.input.length >= 4) {
                this.findPokemon()
            }
        }
    },
    mounted() {
        this.$store.commit('updateFoundPokemon', { filteredPokemons: [] })
    }
}
</script>

<style>

</style>