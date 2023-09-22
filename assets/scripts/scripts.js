const charactersList = document.getElementById('charactersList')
const searchCharactersByName = document.getElementById('searchCharactersByName')

const prevPage = document.getElementById('prevPage')
const nextPage = document.getElementById('nextPage') 

let response
let currentPage = 1

let isLoading = false

async function loadCharacters(page = 1, name = '') {
  try {
    isLoading = true

    const params = {
      name,
      page
    }

    response = await api.get('/character', { params })
    const cards = response.data.results
    console.log(cards);

    prevPage.disabled = true
    nextPage.disabled = true

    charactersList.innerHTML = ''

    cards.forEach(character => {
        
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="characters-card"> 
            <div>
                <img class="characters-image" src="${character.image}">
            </div>
            <div>
                <h2>${character.name}</h2>
                <p>${character.status} - ${character.origin.name} </p>
            </div>
        </div>
        `;
        
        charactersList.appendChild(card);
        
        prevPage.disabled = response.data.info.prev ? false : true;
        nextPage.disabled = response.data.info.next ? false : true;
    })
   

  } catch (error) {
    console.log("Erro ao buscar personagens.", error)
  } finally {
    isLoading = false
  }
}

loadCharacters()

searchCharactersByName.addEventListener('input', () => {
  currentPage = 1
  loadCharacters(currentPage, searchCharactersByName.value)
})

prevPage.addEventListener('click', () => {
  if (currentPage > 1 && !isLoading) {
    currentPage--
    loadCharacters(currentPage)
  }
})

nextPage.addEventListener('click', () => {
  if (currentPage < response.data.info.pages && !isLoading) {
    currentPage++
    loadCharacters(currentPage)
  }
})