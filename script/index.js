function getTrending() {
    return fetch('https://api.giphy.com/v1/gifs/trending?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&limit=5&rating=g').then(
        function (response) {
            return response.json();
        }
    );
}
function getGifBySearch(key) {
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&q=${key}&limit=5&offset=0&rating=g&lang=en`).then(
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
async function renderFromSearch(key) {
    let container = document.getElementById('gifscontainer');
    let response = await getGifBySearch(key);
    console.log(response);

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


renderTrending();


document.body.addEventListener('click', e => {
    if (e.target.id === 'go') {
        let searchVal = document.getElementById('searchbar').value;
        renderFromSearch(searchVal);
    }
});