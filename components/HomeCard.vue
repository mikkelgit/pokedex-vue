<template>
    <NuxtLink :to="'pokemon/' + this.pokemon.id" class="rounded-xl" :style="{ backgroundColor: mainColor }">
        <div class="py-2 px-5 flex justify-between space-x-3">

            <!-- Pokemon Info Container -->
            <div class="flex flex-1 flex-col">

                <!-- Pokemon Name Section -->
                <p class="capitalize text-2xl font-bold mb-3 text-gray-50 tracking-wider">{{pokemon.name}}</p>

                <!-- Pokemon Type Section -->
                <div class="space-y-3">
                    <div class="bg-gray-800 w-full text-center rounded-full bg-opacity-50" v-for="(type, i) in pokemon.types" :key="i" >
                        <p class="capitalize text-gray-100">{{type.type.name}}</p>
                    </div>
                </div>

            </div>

            <!-- Pokemon Image Section -->
            <div>
                <img class="w-32" :src="pokemon.sprites.front_default" alt="">
            </div>

        </div>
    </NuxtLink>
</template>

<script>
export default {
    props: ['pokemon'],
    data () {
        return {
            mainColor: '#fff'
        }
    },
    methods: {
        pokemonColor () {
            switch (this.pokemon.types[0].type.name) {
                case 'bug':
                    return '#abb642'
                case 'dark':
                    return '#6c584a'
                case 'dragon':
                    return '#6843ef'
                case 'electric':
                    return '#f2d054'
                case 'fairy':
                    return '#e29dac'
                case 'flying':
                    return '#a493ea'
                case 'fighting':
                    return '#b13c31'
                case 'fire':
                    return '#e28544'
                case 'ghost':
                    return '#6c5a94'
                case 'grass':
                    return '#8bc560'
                case 'ground':
                    return '#dbc074'
                case 'ice':
                    return '#a6d6d7'
                case 'normal':
                    return '#a8a77d'
                case 'poison':
                    return '#94489b'
                case 'psychic':
                    return '#e66388'
                case 'rock':
                    return '#b4a04a'
                case 'steel':
                    return '#b8b8ce'
                case 'water':
                    return '#6f91e9'
                default:
                    return '#fff'
            }
        }
    },
    mounted() {
        this.mainColor = this.pokemonColor()
    }
}
</script>

<style>

</style>