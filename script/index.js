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
        html += `<img src=${gif.images.fixed_height.url} alt="random gif">`
    });
    container.innerHTML = html;
}

renderTrending();