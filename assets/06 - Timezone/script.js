const endpoint = 'http://worldtimeapi.org/api/timezone/America';
const suggestions = document.querySelector('.suggestions');
const time = document.querySelector('#time');
let cities = [];

fetch(endpoint).then(blob => blob.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].replace('America/', '');
            data[i] = data[i].replace('Argentina/', '');
            data[i] = data[i].replace('Indiana/', '');
            data[i] = data[i].replace('North_Dakota/', '');
            data[i] = data[i].replace('Kentucky/', '');    
        }
        cities.push(...data)
    })
    .catch(error => console.log("Error!"));


function cityMatch(word, cities) {
    return cities.filter(value => {
        const regex = new RegExp(word, 'gi');

        return value.match(regex);
    });
}

function fillSuggestionsList(e) {
    suggestions.innerHTML = '';

    if (e.target.value) {
        const suggCity = cityMatch(e.target.value, cities);
        const html = suggCity.map(item => {
            const regex = new RegExp(e.target.value, 'gi');
    
            return `<li class="name">${item}</li>`;
        }).join('');

        suggestions.innerHTML = html;
    }
}

function selectCity(e) {
    const selectedCity = e.target.textContent;

    suggestions.innerHTML = '';

    setTimezone(selectedCity);
}

function setTimezone(city) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const jsonData = JSON.parse(xhttp.responseText);
            
            time.textContent = jsonData.datetime;
        }
    };

    xhttp.open("GET", `http://worldtimeapi.org/api/timezone/America/${city}`);
    xhttp.send();

}

document.querySelector('#search').addEventListener('input', fillSuggestionsList);
document.querySelector('#search').addEventListener('submit', e => {e.preventDefault();});
suggestions.addEventListener('click', selectCity);

