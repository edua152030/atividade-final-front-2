const cardEl = document.querySelector('.card-list')
const filterInput = document.querySelector('.filtred')
const anteriorBtn = document.querySelector('#anterior')
const proximaBtn = document.querySelector('#proxima')

anteriorBtn.addEventListener('click', () => pages('anterior'))
proximaBtn.addEventListener('click', () => pages('proxima'))

let currentPage = 1
let totalPages = 1
let allCards = []

async function fetchCards(page = 1) {
    let endpoint = '/character'

    const response = await api.get(`${endpoint}?page=${page}`)
    let cards = response.data.results;

    allCards = cards

    cardEl.innerHTML = ''

    anteriorBtn.disabled = true
    proximaBtn.disabled = true
    
    try {
        for (const card of cards) {
            const ultimoEpisodio = card.episode.length - 1
            const episodio = card.episode[ultimoEpisodio]

            const responseEpsiodio = await api.get(card.origin.url)
            const locationData = responseEpsiodio.data

            cardEl.innerHTML += `
                <div class="card">
                    <div class="imagen">
                        <img class="image" src="${card.image}"></img>
                    </div>
                    <div class="informacoes">
                        <h1>${card.name}</h1>
                        <p>${card.status} - ${card.species}</p>
                        <h2>Última localização conhecida</h2>
                        <p>${locationData.name}</p>
                        <h2>Visto pela última vez em</h2>
                        <p>${locationData.name}</p>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.log('não foi possível carregar os cards', error)
    } finally {
        anteriorBtn.disabled = false
        proximaBtn.disabled = false
    }
    
    totalPages = response.data.info.pages
}

fetchCards()

async function pages(option) {
    option === 'proxima' ? currentPage++ : currentPage--
    
    if (currentPage < 1) {
        currentPage = 1;
    }

    if (currentPage > totalPages) { 
        currentPage = totalPages;
    }

    fetchCards(currentPage)
}

async function filterCards() {
    cardEl.innerHTML = ''

    const filterValue = filterInput.value.toLowerCase()

    const filteredCards = allCards.filter(card => card.name.toLowerCase().includes(filterValue))

    for (const card of filteredCards) {
        const ultimoEpisodio = card.episode.length - 1
        const episodio = card.episode[ultimoEpisodio]

        const responseEpsiodio = await api.get(card.origin.url)
        const locationData = responseEpsiodio.data

        cardEl.innerHTML += `
            <div class="card">
                <div class="imagen">
                    <img class="image" src="${card.image}"></img>
                </div>
                <div class="informacoes">
                    <h1>${card.name}</h1>
                    <p>${card.status} - ${card.species}</p>
                    <h2>Última localização conhecida</h2>
                    <p>${locationData.name}</p>
                    <h2>Visto pela última vez em</h2>
                    <p>${locationData.name}</p>
                </div>
            </div>
        `;
    }
}

filterInput.addEventListener('input', filterCards)
