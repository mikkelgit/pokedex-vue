export const state = () => ({
    pokemonList: [],
    foundPokemons: []
})

export const mutations = {
    updatePokemonList (state, payload) {
        state.pokemonList = payload.pokemons
    },
    updateFoundPokemon (state, payload) {
        state.foundPokemons = payload.filteredPokemons
    }
}

export const actions = {
    async fetchPokemon(context, currentPage) {
        const response = await this.$axios(`https://pokeapi.co/api/v2/pokemon?limit=16&offset=${ 16 * (currentPage - 1) }`)

        const pokemonDataPromise = []
        response.data.results.forEach(pokemon => {
            pokemonDataPromise.push(this.$axios(pokemon.url))
        })

        const pokemonDataResponse = await Promise.all(pokemonDataPromise)
        const pokemonData = pokemonDataResponse.map(pokemon => pokemon.data)

        context.commit('updatePokemonList', { pokemons: pokemonData })
    },
    async findPokemon(context, input) {
        const response = await this.$axios('https://pokeapi.co/api/v2/pokemon?limit=1118')
        const filteredData = []
        response.data.results.forEach(item => {
            if (item.name.includes(input.toLowerCase())) {
                filteredData.push([item.name, Number(item.url.split('/').filter(string => string).pop())])
            }
        })
        context.commit('updateFoundPokemon', { filteredPokemons: filteredData })
    }
}