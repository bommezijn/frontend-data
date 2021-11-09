console.log('hello JS')
const URL = `https://www.fruityvice.com/`
const endpoint = `api/fruit/all`

function getData() {
  fetch(`${URL}${endpoint}`)
    .then(response => response.json())
    .then(data => console.table(data))
}

getData()