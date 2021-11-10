console.log('hello JS')
const URL = `https://www.fruityvice.com/`
const endpoint = `api/fruit/all`

function getData() {
  fetch(`${URL}${endpoint}`)
    .then(response => response.json())
    .then(data => console.table(data))
}


/* Select the element div and set the text or html */
// d3.select('text').text('Hello') //Doesn't do anything?
d3.select('div').text('Hello')

const svg = d3.select('svg')
svg.style("border", "1px solid black")

/* const circle = d3.select('circle')
circle
  .attr("r", 10)
  .attr("cx", 10)
  .attr("cy", 10)
  .style("stroke-width", 2)
  .style("fill", '#ffcc00') */

for (let index = 0; index < 3; index++) {
  let coords = Math.round(Math.random()*100)
  svg.append('circle')
    .attr("r", 10)
    .attr("cx", 100)
    .attr("cy", coords)
    .style("stroke-width", 2)
    .style("stroke", "black")
    .style("fill", '#ffcc00')
}