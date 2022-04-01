function getTrending() {
    return fetch('https://api.giphy.com/v1/gifs/trending?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&limit=30&rating=pg').then(
        function (response) {
            return response.json();
        }
    );
}
function getGifBySearch(key) {
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&q=${key}&limit=20&offset=0&rating=pg&lang=en`).then(
        function (response) {
            return response.json();
        }
    );
}
function getRandomGif() {
    return fetch(`https://api.giphy.com/v1/gifs/random?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&tag=&rating=pg`).then(
        function (response) {
            return response.json();
        }
    );
}
function getGifsById(ids) {
    let percentSeperation = ids.join("%2C");
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
            response.data = [];
            for (let i = 0; i < 30; i ++) {
                let gif = await getRandomGif();
                response.data.push(gif.data);
            }
            break;
        case 'ids': 
            response = await getGifsById(key);
            console.log(response);
            break;
    }
    let html = "";
    let i = 0;
    for(let j = 0; j < 4; j++){
        document.getElementById(`gifCol${j}`).innerHTML = '';
    }
    response.data.forEach(gif => {
        if (i > 3) {i = 0;}
        html = 
        `
            <span class="gif-span">
                    <i class="fa-regular fa-heart heart"></i>
                    <i class="fa-solid fa-heart heart-filled"></i>
                    <img src=${gif.images.fixed_width.url} class="gif" alt="${gif.title}">
            </span>

        `
        document.getElementById(`gifCol${i}`).innerHTML += html;
        i ++;
    });
}
function renderGifsById() {
    renderGifs('ids', savedGifs);
}

let savedGifs = [];
let numCols = 4;
if (localStorage.getItem('saved')) {savedGifs = JSON.parse(localStorage.getItem('saved'));}
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
                renderGifs('random');
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
    if (window.matchMedia('(min-width: 1200px)').matches) {
        colNums = 4;
        console.log('window is greater than 1200 px')
    } else if (window.matchMedia('(min-width: 900px)').matches) {
        colNums = 3;
        console.log('window is between 900px - 1200px');
    }
})