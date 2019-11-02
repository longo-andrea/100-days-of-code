const data = document.querySelector('#person-data');
const firstName = document.querySelector('[name=firstname]');
const lastName = document.querySelector('[name=lastname]');
const nickName = document.querySelector('[name=nickname]');
const age = document.querySelector('[name=age]');
const peopleList = document.querySelector("#people-list");
const people = [];

function addPerson(e) {
    e.preventDefault();

    people.push({
        firstName: `${firstName.value}`,
        lastName: `${lastName.value}`,
        nickName: `${nickName.value}`,
        age: parseInt(`${age.value}`)
    });

    showPeople();
    this.reset();
}

function showPeople() {
    peopleList.innerHTML = people.map(person => {
        return `<li>
            <span>Name: <strong>${person.firstName}</strong></span>
            <span>Lastname: <strong>${person.lastName}</strong></span>
            <span>Nickname: <strong>${person.nickName}</strong></span>
            <span>Age: <strong>${person.age}</strong></span>
            </li>`
    }).join('');
}

data.addEventListener('submit', addPerson);

// Functions
const increasingOrderNameButton = document.querySelector('#increasing-name');
const decreasingOrderNameButton = document.querySelector('#decreasing-name');
const increasingOrderLastNameButton = document.querySelector('#increasing-lastname');
const decreasingOrderLastNameButton = document.querySelector('#decreasing-lastname');
const increasingOrderNickNameButton = document.querySelector('#increasing-nickname');
const decreasingOrderNickNameButton = document.querySelector('#decreasing-nickname');
const increasingOrderAgeButton = document.querySelector('#increasing-age');
const decreasingOrderAgeButton = document.querySelector('#decreasing-age');
const totalAgeButton = document.querySelector('#total-age');

function increasingOrderName() {
    people.sort((a, b) => a.firstName > b.firstName ? 1 : -1);

    showPeople();
}

function decreasingOrderName() {
    people.sort((a, b) => a.firstName > b.firstName ? -1 : 1);

    showPeople();
}

function increasingOrderLastName() {
    people.sort((a, b) => a.lastName > b.lastName ? 1 : -1);

    showPeople();
}

function decreasingOrderLastName() {
    people.sort((a, b) => a.lastName > b.lastName ? -1 : 1);

    showPeople();
}

function increasingOrderNickName() {
    people.sort((a, b) => a.nickName > b.nickName ? 1 : -1);

    showPeople();
}

function decreasingOrderNickName() {
    people.sort((a, b) => a.nickName > b.nickName ? -1 : 1);

    showPeople();
}

function increasingOrderAge() {
    people.sort((a, b) => a.age > b.age ? 1 : -1);

    showPeople();
}

function decreasingOrderAge() {
    people.sort((a, b) => a.age > b.age ? -1 : 1);

    showPeople();
}

function totalAge() {
    const count = people.reduce((count, person) => count + person.age, 0);
    
    alert(count);
}

increasingOrderNameButton.addEventListener('click', increasingOrderName);
decreasingOrderNameButton.addEventListener('click', decreasingOrderName);
increasingOrderLastNameButton.addEventListener('click', increasingOrderLastName);
decreasingOrderLastNameButton.addEventListener('click', decreasingOrderLastName);
increasingOrderNickNameButton.addEventListener('click', increasingOrderNickName);
decreasingOrderNickNameButton.addEventListener('click', decreasingOrderNickName);
increasingOrderAgeButton.addEventListener('click', increasingOrderAge);
decreasingOrderAgeButton.addEventListener('click', decreasingOrderAge);
totalAgeButton.addEventListener('click', totalAge);