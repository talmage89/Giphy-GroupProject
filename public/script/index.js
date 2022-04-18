function getTrending() {
    return fetch('https://api.giphy.com/v1/gifs/trending?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&limit=40&rating=pg').then(
        function (response) {
            return response.json();
        }
    );
}
function getGifBySearch(key) {
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&q=${key}&limit=40&offset=0&rating=pg&lang=en`).then(
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
    let load = document.getElementById("loader");
    if (load) {load.style.display = 'block';}
    
    
    let response = await getTrending();
    for(let j = 0; j < 4; j++){document.getElementById(`gifCol${j}`).innerHTML = '';}
    switch(type){
        case 'search':
            response = await getGifBySearch(key);
            break;
        case 'random': 
            response.data = [];
            for (let i = 0; i < 20; i ++) {
                let gif = await getRandomGif();
                response.data.push(gif.data);
            }
            break;
        case 'ids': 
            if (key.length > 0) {
                response = await getGifsById(key);
            } else {
                response = undefined;
            }
            break;
    }
    if (document.getElementById("nogif-filler")) {
        document.getElementById("nogif-filler").style.display = "none";
    }
    if (load) {
        load.style.display = 'none';
    }
    let html = "";
    let i = 0;
    if (response != undefined) {
        response.data.forEach(gif => {
            if (i > 3) {i = 0;}
            html = 
            `
                <span class="gif-span">
                <img src=${gif.images.fixed_width.url} class="gif" alt="${gif.title}">
                `;
                if (savedGifs.indexOf(gif.id) != -1) {
                    html += `
                            <span class="gif-overlay" style="height: ${gif.images.fixed_width.height}px; width: 200px;"></span>
                            <i class="fa-solid fa-heart heart-filled save" id="${gif.id}" style="color: rgb(255,0,0);"></i>
                            `;
                } else {
                    html += `
                            <span class="gif-overlay" style="height: ${gif.images.fixed_width.height}px; width: 200px;"></span>
                            <i class="fa-solid fa-heart heart-filled save" id="${gif.id}"></i>
                            `;
                }
                html += `</span>`
            document.getElementById(`gifCol${i}`).innerHTML += html;
            i ++;
        });
    } else if (document.getElementById('nogif-filler')) {
        document.getElementById("nogif-filler").style.display = "block";
    }
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
                renderGifs('random');
                break;
        }
    }
    if (e.target.className.includes('save')) {
        if (savedGifs.indexOf(e.target.id) === -1) {
            document.getElementById(e.target.id).style.color = "rgb(255, 0, 0)";
            savedGifs.push(e.target.id);
        } else {
            document.getElementById(e.target.id).style.color = "rgb(238, 238, 238)";
            savedGifs.splice(savedGifs.indexOf(e.target.id), 1);
        }
        localStorage.setItem('saved', JSON.stringify(savedGifs));
    }
    if (e.target.id === 'savedPage') {
        renderGifs('ids', savedGifs);
    }
});

var enter = document.getElementById("searchbar");
enter.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("myBtn").click();
    }
});