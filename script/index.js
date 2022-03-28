function getTrending() {
    return fetch('https://api.giphy.com/v1/gifs/trending?api_key=VpILSokp5S1iGMr2ZWL8yGPLXKmdkscB&limit=5&rating=g').then(
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
        <img src=${gif.images.fixed_height.url} class="card-img-top" alt="random gif">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Something</p>
        </div>`
    });
    container.innerHTML = html;
}

renderTrending();