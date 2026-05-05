const main = document.querySelector('.center');

const ofert = document.querySelectorAll('.oferta').length;

const licznik = document.createElement('h3');

licznik.innerText = `Znaleziono ofert: ${ofert}`;
licznik.style.marginBottom = '20px';

main.prepend(licznik);