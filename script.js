const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// caches オブジェクトが window オブジェクトに存在するかチェック

async function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const requestUrl = `SEE KEE PASS`;
  const cacheName = 'exchangeRateApi';

  if (!'caches' in window) {
    return;
  }

  let cachedResponse = await caches.match(requestUrl);

  if (!cachedResponse) {
    const cache = await caches.open(cacheName);
    await cache.add(requestUrl);
    cachedResponse = await caches.match(requestUrl);
  }
  const exchangeRateJson = await cachedResponse.json();
  const rate = exchangeRateJson.conversion_rates[currency_two];

  rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
  amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
}

currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value
  currencyEl_two.value = temp;
  calculate();
})

calculate();