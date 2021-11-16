console.log(`%cHello JS`, `color: #ffcc00; font-weight: bold;`)
const API = 'https://api.themoviedb.org/3/person/popular?api_key=63b8e2e812b6172f220bb5bb9aab2dea'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

const dimensions = {
  margin: {t:20, r: 20, b: 30, l: 40},
  get width() {return 960 - this.margin.l - this.margin.r},
  get height() {return 500 - this.margin.t - this.margin.b}
}

const SVG = d3.select('body').append('div').attr('id', 'graph').append('svg')
  .attr('width', dimensions.width + dimensions.margin.l + dimensions.margin.r)
  .attr('height', dimensions.height + dimensions.margin.t + dimensions.margin.b)
  .append('g')
    .attr('transform', `translate(${dimensions.margin.l}, ${dimensions.margin.t})`)


const createAxis = (data) => {
  const X = d3.scaleBand()
    .domain(data.map(d => d.family))
    .range([0, dimensions.width])

  const Y = d3.scaleLinear()
    // .domain([0, d3.max(data, d=> {return d.rating})]) 
    .domain(d3.extent(data, d => d.rating))
    .range([dimensions.height, 0]);

  SVG.append('g')
    .attr('transform', `translate(0, ${dimensions.height})`)
    .call(d3.axisBottom(X))
    .selectAll('text')
    .attr('transform', `translate(-10,0) rotate(-45)`)
    .style('text-anchor', 'end')
  
  SVG.append('g')
    .call(d3.axisLeft(Y))

  return { X, Y};
}

const dataset = async (url) => {
  try {
    const data = d3.json(url)
    return await data
  } catch (error) {
    console.error(error)
  }
}

const roundNumber = (Number) => {
  return typeof(Number) === 'number' ? Math.round(Number) : console.error('cannot convert non numerical value')
}

const createPath = (IMAGE_URL, slug) => {
  return `${IMAGE_URL}${slug}`
}

const numberToGender = (Number) => {
  return Number === 1 ? 'Female' : 'Male'
}

const sanitizeData = async (data) => {
  const dirtyData = await data.results;
  try {
    return dirtyData.map(
      selection => {
        const ACTOR = {
          name: selection.name,
          rating: roundNumber(selection.popularity),
          gender: numberToGender(selection.gender),
          photo: createPath(IMAGE_URL, selection.profile_path)
        }
        return ACTOR
      }
    )
  } catch (error) {
    console.error(error)
  }
}

console.log(await sanitizeData(await dataset(API)))

async function render(data) {
  const {X, Y} = createAxis(data)

  SVG.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => {return X(d.name)})
    .attr('width', X.bandwidth())
    .attr('y', (d) => {return Y(d.rating)})
    .attr('height', (d) => {return dimensions.height - Y(d.rating)})  
    .style('border', `1px solid black`)
}

render(await sanitizeData(await dataset(API)))