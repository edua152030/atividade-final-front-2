const cardEl = document.querySelector('.card-list');
const FilterEl = document.querySelector('.filtred');
const anteriorBtn = document.querySelector('#anterior');
const proximaBtn = document.querySelector('#proxima');

FilterEl.addEventListener('input', () => filtrado(currentPage)); 
anteriorBtn.addEventListener('click', () => pages('anterior'));
proximaBtn.addEventListener('click', () => pages('proxima'));

let currentPage = 1;

async function fetchCards(page = 1) {
    const response = await api.get('/character?page=' + page);
    let cards = response.data.results;

    cardEl.innerHTML = '';

    cards.forEach(card => {
        const lastEpisodeIndex = card.episode.length - 1;
        const lastEpisode = card.episode[lastEpisodeIndex];

        cardEl.innerHTML += `
        <div class="card">
            <div class="imagen">
                <img class="image" src="${card.image}"></img>
            </div>
            <div class="informacoes">
                <h1>${card.name}</h1>
                <p>${card.status} - ${card.species}</p>
                <h2>Última localização conhecida</h2>
                <p>${card.origin.name}</p>
                <h2>Visto última vez em</h2>
                <p>${lastEpisode}</p>
            </div>
        </div>
        `;
    });
}

fetchCards();

async function filtrado(page) { 
    const searchTerm = FilterEl.value.toLowerCase();

    const response = await api.get('/character?page=' + page); 
    let cards = response.data.results;

    cardEl.innerHTML = '';

    cards.forEach(card => {
        if (card.name.toLowerCase().includes(searchTerm)) {
            const lastEpisodeIndex = card.episode.length - 1;
            const lastEpisode = card.episode[lastEpisodeIndex];

            cardEl.innerHTML += `
            <div class="card">
                <div class="imagen">
                    <img class="image" src="${card.image}"></img>
                </div>
                <div class="informacoes">
                    <h1>${card.name}</h1>
                    <p>${card.status} - ${card.species}</p>
                    <h2>Última localização conhecida</h2>
                    <p>${card.origin.name}</p>
                    <h2>Visto última vez em</h2>
                    <p>${lastEpisode}</p>
                </div>
            </div>
            `;
        }
    });
}

async function pages(option) {
    option === 'proxima' ? currentPage++ : currentPage--;

    if (currentPage < 1) {
        currentPage = 1;
    }

    fetchCards(currentPage);
}
