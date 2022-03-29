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
async function renderTrending() {
    let response = await getTrending();
    let html = "";
    let i = 0;
    for(let j = 0; j < 4; j++){document.getElementById(`gifCol${j}`).innerHTML = '';}
    response.data.forEach(gif => {
        if (i > 3) {i = 0;}
        html += `<div class="card" style="width: 15rem;">
                        <img src=${gif.images.fixed_width.url} class="card-img-top" alt="random gif">
                        <div class="card-body">
                            <span><button class="btn btn-primary">Save</button></span>
                        </div>
                </div>`
        document.getElementById(`gifCol${i}`).innerHTML += html;
        html = '';
        i ++;
    });
}
async function renderFromSearch(key) {
    let response = await getGifBySearch(key);
    let html = "";
    let i = 0;
    for(let j = 0; j < 4; j++){document.getElementById(`gifCol${j}`).innerHTML = '';}
    response.data.forEach(gif => {
        if (i > 3) {i = 0;}
        html += `<div class="card" style="width: 15rem;">
                        <img src=${gif.images.fixed_width.url} class="card-img-top" alt="random gif">
                        <div class="card-body">
                            <span><button class="btn btn-primary">Save</button></span>
                        </div>
                </div>`
        document.getElementById(`gifCol${i}`).innerHTML += html;
        html = '';
        i ++;
    });
}


renderTrending();


document.body.addEventListener('click', e => {
    if (e.target.id === 'go') {
        let searchVal = document.getElementById('searchbar').value;
        renderFromSearch(searchVal);
    }
});