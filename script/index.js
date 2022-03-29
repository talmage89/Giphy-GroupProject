function getTrending() {
    return fetch('https://api.giphy.com/v1/gifs/trending?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&limit=20&rating=g').then(
        function (response) {
            return response.json();
        }
    );
}

async function renderTrending() {
    let container = document.getElementById('gifscontainer');
    let response = await getTrending();
    console.log(response.data);
    
    let html = '';
    response.data.forEach(gif => {
        html += `<div class="card" style="width: 15rem;">
                    <img src=${gif.images.fixed_width.url} class="card-img-top" alt="random gif">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Something</p>
                    </div>
                </div>`
    });
    container.innerHTML = html;
}
function getGifBySearch(key) {
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&q=${key}&limit=20&offset=0&rating=g&lang=en`).then(
        function (response) {
            return response.json();
        }
    );
}
function getRandomGif() {
    return fetch(`https://api.giphy.com/v1/gifs/random?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&tag=&rating=g`).then(
        function (response) {
            return response.json();
        }
    );
}
function getGifsById(ids) {
    let percentSeperation = ids.join("%");
    return fetch(`https://api.giphy.com/v1/gifs?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&ids=${percentSeperation}`).then(
        function (response) {
            return response.json();
        }
    );
}
async function renderGifs(type, key) {
    let response = await getTrending();
    console.log(response);
    switch(type){
        case 'search':
            response = await getGifBySearch(key);
            break;
        case 'random': 
            response = await getRandomGif();
            break;
        case 'ids': 
            response = await getGifsById(key);
    }
    let html = "";
    let i = 0;
    for(let j = 0; j < 4; j++){document.getElementById(`gifCol${j}`).innerHTML = '';}
    response.data.forEach(gif => {
        if (i > 3) {i = 0;}
        html += `<div class="card" style="width: 15rem;">
                        <img src=${gif.images.fixed_width.url} class="card-img-top" alt="${gif.title}">
                        <div class="card-body">
                            <span><button class="btn btn-primary save" id="${gif.id}">Save</button></span>
                        </div>
                </div>`
        document.getElementById(`gifCol${i}`).innerHTML += html;
        html = '';
        i ++;
    });
}

let savedGifs = [];
renderGifs();

document.body.addEventListener('click', e => {
    if (e.target.className === 'gobutton') {
        let searchVal = document.getElementById('searchbar').value;
        renderGifs('search', searchVal);
    }
    if (e.target.className === 'explore-menu') {
        switch(e.target.id) {
            case 'happy':
                renderGifs('search', 'happy');
                break;
            case 'sad':
                renderGifs('search', 'sad');
                break;
            case 'animals':
                renderGifs('search', 'animals');
                break;
            case 'celebrities':
                renderGifs('search', 'celebritiess');
                break;
            case 'disney':
                renderGifs('search', 'disney');
                break;
            case 'marvel':
                renderGifs('search', 'marvel');
                break;
            case 'other':
                renderGifs('search', 'random');
                break;
        }
    }
    if (e.target.className === 'save') {
        savedGifs.push(e.target.id);
    }
    if (e.target.id === 'savedPage') {
        renderGifs('ids', savedGifs);
        console.log('working')
    }
});
