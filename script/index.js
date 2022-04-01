function getTrending() {
    return fetch('https://api.giphy.com/v1/gifs/trending?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&limit=20&rating=g').then(
        function (response) {
            return response.json();
        }
    );
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
    console.log(ids);
    let percentSeperation = ids.join("%2C");
    console.log(percentSeperation);
    return fetch(`https://api.giphy.com/v1/gifs?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&ids=${percentSeperation}`).then(
        function (response) {
            return response.json();
        }
    );
}
async function renderGifs(type, key) {
    let response = await getTrending();
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
function containerFunction() {
    console.log(savedGifs);
    renderGifs('ids', savedGifs);
    console.log('working');
}

let savedGifs = [];
if (localStorage.getItem('saved')) {
    savedGifs = JSON.parse(localStorage.getItem('saved'));
}
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
            case 'catswithlightsabers':
                renderGifs('search', 'cats with lightsabers');
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
            case 'dc':
                renderGifs('search', 'dc');
                break;
            case 'starwars':
                renderGifs('search', 'star wars');
                break;
            case 'other':
                renderGifs('search', 'random');
                break;
        }
    }
    if (e.target.className.includes('save')) {
        if (savedGifs.indexOf(e.target.id) === -1) {
            savedGifs.push(e.target.id);
            console.log(savedGifs);
        }
        localStorage.setItem('saved', JSON.stringify(savedGifs));
    }
    if (e.target.id === 'savedPage') {
        renderGifs('ids', savedGifs);
        console.log('working')
    }
});
window.addEventListener('resize', () => {
    console.log('window is being resized...')
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    if (mediaQuery.matches) {
        alert('Media Query Matched!');
    }
})