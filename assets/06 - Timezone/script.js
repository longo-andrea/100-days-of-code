const endpoint = 'http://worldtimeapi.org/api/timezone/America';
const search = document.querySelector('#search');
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
    search.querySelector('input').value = "";

    setTimezone(selectedCity);
}

function setTimezone(city) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const jsonData = JSON.parse(xhttp.responseText);
            const hours = jsonData.datetime.substring(
                jsonData.datetime.lastIndexOf("T") + 1,
                jsonData.datetime.lastIndexOf(".")
            );
            const hour = hours.substring(0, hours.indexOf(':'));
            const mins = hours.substring(hours.indexOf(':') + 1, hours.indexOf(':', hours.indexOf(':') + 1));
            const secs = hours.substring(hours.lastIndexOf(':') + 1, hours.length);
            
            time.innerHTML = `<h2> You have selected: ${city}! </h2>
                <span id="hour">${hour}</span>
                <span id="mins">${mins}</span>
                <span id="secs">${secs}</span>`;
        }
    };

    xhttp.open("GET", `http://worldtimeapi.org/api/timezone/America/${city}`);
    xhttp.send();
}

search.addEventListener('input', fillSuggestionsList);
search.addEventListener('submit', e => {e.preventDefault();});
suggestions.addEventListener('click', selectCity);

/* DARK MODE */
const darkCheck = document.querySelector('#dark-mode');

darkCheck.addEventListener('change', (e) => {
    if(e.target.checked)
        document.querySelector('body').classList.add('dark');
    else    
        document.querySelector('body').classList.remove('dark');
});