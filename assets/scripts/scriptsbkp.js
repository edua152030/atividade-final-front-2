const cardEl = document.querySelector('.card-list');

const searchInput = document.getElementById('searchInput');

let cardInfo = [];

async function cardList() {
    try { 
        const response = await api.get('/character');
        cardInfo = response.data.results;

        displayCards(cardInfo);

        searchInput.addEventListener('input', function () {

           cardEl.innerHTML = '';

            // Filtra os cartões com base no termo de pesquisa.
            const filtrarCards = cardInfo.filter(cards => cards.name.toLowerCase().includes(searchTerm));

            displayCards(filtrarCards);
        });
    } catch (error) { 
        console.log('Nenhum card localizado', error);
    }
}

function displayCards(cardsDisplay) {
  
    cardsDisplay.forEach(cards => {
        
        const cardUnico = document.createElement('div');

        const ultimoEpisodio = cards.episode[cards.episode.length - 1];

        cardUnico.innerHTML = `
        <div class="principal">
            <div class="cards">
                <div><img src="${cards.image}" class="img"></div>
                <div>
                    <h2>${cards.name}</h2><br>
                    <p>${cards.status} - ${cards.species}</p><br>
                    <h4>Última localização conhecida</h4>
                    <p>${cards.location.name}</p>
                    <h4>Visto pela última vez em</h4>
                    <p>${ultimoEpisodio}</p>
                </div>
            </div>
        </div>
        `;

        cardEl.appendChild(cardUnico);
    });
}

cardList();
