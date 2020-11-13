//import './css/style.css';
import countryCards from './hbs/contry-cards.hbs'
const debounce = require('lodash.debounce');

const refs = {
    searchForm: document.querySelector(`.form-control`),
    articlesContainer: document.querySelector(`.js-articles-container`),
};

refs.searchForm.addEventListener(`input`, debounce(onSearch, 500));


function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.target.value;

  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

    fetch(url)
        .then(r => r.json())
        .then(country => {
            console.log(country);
            const markUp = countryCards(country);
            console.log(markUp);
         
            articlesContainer.insertAdjacentHTML('beforeend', markUp)
        }
    );
}