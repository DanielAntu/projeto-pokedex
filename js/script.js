const numeropoke = document.querySelector('.numeropoke')
const nomepoke = document.querySelector('.nomepokemon')
const pokemon_img = document.querySelector('.pokemon-img')
const input_pokemon = document.querySelector('#pokemon')
const ante = document.querySelector('#ante')
const prox = document.querySelector('#prox')

var proxpoke = 1

const pesqpokemon = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    ApiResposta = await fetch(url)
    if (ApiResposta.status == 200) {
        const data = await ApiResposta.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    nomepoke.innerHTML = 'Carregando...'
    numeropoke.innerHTML = ''
    const data = await pesqpokemon(pokemon)
    if (data) {
        numeropoke.innerHTML = data.id
        nomepoke.innerHTML = data.name
        pokemon_img.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemon_img.style.opacity = 1
        input_pokemon.value = ''
        proxpoke = data.id
    } else {
        pokemon_img.style.opacity = 0
        nomepoke.innerHTML = 'Not Found-C'
        numeropoke.innerHTML = ''
    }
}

input_pokemon.addEventListener('search', () => {
    renderPokemon(input_pokemon.value.toLowerCase())
})

ante.addEventListener('click', () => {
    if (proxpoke > 1) {
        proxpoke--
        renderPokemon(proxpoke)
    } 
})

prox.addEventListener('click', () => {
    proxpoke++
    renderPokemon(proxpoke)
})

renderPokemon(proxpoke)
