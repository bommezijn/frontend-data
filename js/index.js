console.log('hello JS')

const dimensions = {
  margin: {t: 40, b: 10, l: 120, r:20},
  get width(){return 800 - this.margin.l - this.margin.r},
  get height(){return 600 - this.margin.b - this.margin.t},
}

const FAKEDATA = [33, 88, 54, 102, 55];

function getData() {
  fetch(`${URL}${endpoint}`)
    .then(response => response.json())
    .then(data => console.table(data))
}

const SVG = d3.select('body').append('svg')
  .attr('width', dimensions.width)
  .attr('height', dimensions.height)
  .attr('border', '1px solid black')

const GROUP = SVG.append('g')
  .attr('transform', `translate(${dimensions.margin.l}, ${dimensions.margin.t})`)

const RECTANGLE =
  GROUP.selectAll('rect').data(FAKEDATA).join(
    (enter) => enter.append('rect').attr('x',0),
    (update) => update,
    (exit) => exit.remove()
  );

  RECTANGLE
    .attr('height', 50)
    .attr('width', (d) => d * 7)
    .attr('y', (d,i) => i*(50+5))
    .attr('class', 'bars')
