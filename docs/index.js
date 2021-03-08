/*James O’Beirne
M4.254 - Desarrollo front-end con framew. JavaScript aula 2
PEC1 - Introducción al desarrollo frontend
07 de Marzo de 2021*/


//Exchange Rate API
//https://app.exchangerate-api.com/dashboard 

const currencyElement_one = document.getElementById('currency-one');
const amountElement_one = document.getElementById('amount-one');
const currencyElement_two = document.getElementById('currency-two');
const amountElement_two = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');
const message_div = document.getElementById('estado-de-esperaID');


//Fetch exchange rate and update DOM
function calculate() {
    const currency_one = currencyElement_one.value;
    const currency_two = currencyElement_two.value;

    async function fetch_exchange_rate() {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/ab65beff42352a8196716086/latest/${currency_one}`);
        //const response = await fetch('/oops'); //error test

        if (!response.ok) {
            message_div.innerText = `Status: ${response.status}, ${response.statusText}`;
        } else {
            message_div.innerText = " ";
        }

        const exchange_rate = await response.json();
        return exchange_rate;
    }

    //inserts rate and amount 
    fetch_exchange_rate().then(json_data => {
        const rate = json_data.conversion_rates[currency_two]; //computed property name
        rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        amountElement_two.value = (`${amountElement_one.value}` * rate).toFixed(2);

        if (rate < 0) {
            message_div.innerText = "Negative rates are not allowed. Error!";
        } else {
            message_div.innerText = " ";
        }
    });
}

//changes currency values
function swapCurrency() {
    let temp_currency_one = currencyElement_one.value;
    let temp_currency_two = currencyElement_two.value;
    temp_currency_two = [temp_currency_one, temp_currency_one = temp_currency_two][0];
    //b = [a, a = b][0];

    currencyElement_one.value = temp_currency_one;
    currencyElement_two.value = temp_currency_two;
    calculate();
}



//Event listeners
currencyElement_one.addEventListener('change', calculate);
amountElement_one.addEventListener('input', calculate);
currencyElement_two.addEventListener('change', calculate);
amountElement_two.addEventListener('input', calculate);
swap.addEventListener('click', swapCurrency);



