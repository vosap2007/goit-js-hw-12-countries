import './css/style.css';
//import { result } from 'lodash';
import countryCards from './hbs/contry-cards.hbs';
import countryList from './hbs/list.hbs';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const debounce = require('lodash.debounce');
const { error } = require('@pnotify/core');

const refs = {
    searchForm: document.querySelector(`.form-control`),
    articlesContainer: document.querySelector(`.js-articles-container`),
};

refs.searchForm.addEventListener(`input`, debounce(onSearch, 500));


function onSearch(e) {
    e.preventDefault();

   clearArticlesContainer();
    const searchQuery = e.target.value;

  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

    fetch(url)
        .then(r => r.json())
        .then(country => {
            const markUp = countryCards(country);
            const newList = countryList(country);

            if (country.length === 1) {
                refs.articlesContainer.insertAdjacentHTML('beforeend', markUp)
            } else if (country.length >= 2 && country.length <= 10) {
                refs.articlesContainer.insertAdjacentHTML('beforeend', newList)
            } else {
                error({
                    text: 'Уточните запрос!',
                    type: 'error',
                    delay: 1000,
                });
            }
        }
    )
}

function clearArticlesContainer() {
    refs.articlesContainer. innerHTML = '';   
}

