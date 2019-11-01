const object = document.querySelector('#object');
const objectList = document.querySelector("#object-list");
const increasingButton = document.querySelector('[data-filter="increasing"]');
const decreasingButton = document.querySelector('[data-filter="decreasing"]');
const acountButton = document.querySelector('[data-filter="a-count"]');
const shiftValue = document.querySelector('[data-filter="shift"]');
const shiftButton = document.querySelector('#shift');
const values = [];

function insertObject(e) {
    e.preventDefault();

    const text = (this.querySelector('[name=item]')).value;

    values.push(text);

    showValues(objectList, values);
    this.reset();
}

function showValues(objectList, values) {
    objectList.innerHTML = values.map(value => {
        return `<li>${value}</li>`
    }).join('');
}

function increasingOrder() {
    values.sort((a, b) => a > b ? 1 : -1);

    showValues(objectList, values);
}

function decreasingOrder() {
    values.sort((a, b) => a > b ? -1 : 1);

    showValues(objectList, values);
}

function aCount() {
    const count = values.reduce((count, value) => {
        return count + (value.match(/a/g) || []).length;
    }, 0);
    
    alert(count);
}

function shiftLetters(num) {
    num = parseInt(num);
    values.forEach(function(value, index) {
        let result = '';

        for(i = 0; i < value.length; i++) {
            const charCode = value[i].charCodeAt() + num;

            result += String.fromCharCode(charCode)
        }

        values[index] = result;
    });

    showValues(objectList, values);
}

object.addEventListener('submit', insertObject);
increasingButton.addEventListener('click', increasingOrder);
decreasingButton.addEventListener('click', decreasingOrder);
acountButton.addEventListener('click', aCount);
shiftButton.addEventListener('click', (e) => shiftLetters(`${shiftValue.value}`));
