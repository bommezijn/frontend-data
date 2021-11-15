console.log(`%cHello World`, `color: #ffcc00; font-weight: bold;`)
import getData from './modules/data.js';
import {dim, createSVG} from './modules/svg.js'

const SVG = createSVG()

const API = 'https://api.themoviedb.org/3/person/popular?api_key=63b8e2e812b6172f220bb5bb9aab2dea'

const dataset = getData(API).then(whole =>
  whole.map(specified => {
    const CELEB = {
      name: specified.name,
      mug: specified.profile_path,
      rating: Math.round(specified.popularity)
    }
    return CELEB
  })
).catch(e => {
  console.error(e);
  d3.select('body').append('p').text('error in data fetching')
})

// const createGroup = SVG.append('g')
const createGroup = (parent) => {
  return parent.append('g')
    // .attr('transform', `translate(${dim.margin.l} ${dim.margin.t})`)
}

const createAxis = (data) => {
  /* Create X axis based on the value from rating */
  const X_AXIS = d3.scaleLinear()
    .domain(d3.extent(data, d => d.rating))
    .range([0, dim.width]);

  SVG.append('g')
  .attr('transform', `translate(0,  ${dim.height - dim.margin.t})`) //push scale down
  .call(d3.axisBottom(X_AXIS))
  
  /* Create Y axis based on the value from name */

  const Y_AXIS = d3.scaleOrdinal()
    .domain(data, data.map(d => {return d.name}))
    .range([dim.height, 0])

  SVG.append('g')
    .call(d3.axisRight(Y_AXIS))

  return {X_AXIS, Y_AXIS};
}

const populate = async () => {
  const {X_AXIS, Y_AXIS} = createAxis(await dataset) 

  // console.log(await dataset)
  const rectangles =  createGroup(SVG)
    .selectAll('rect')
    .data(await dataset)
    .join(
      (enter) => {
        const r = enter.append('rect')
        r.append('title')
        return r
      },
      (update) => update,
      (exit) => exit.remove()
    )
  
  const cscale = d3.scaleOrdinal().domain(d3.extent(await dataset, d=> d.rating)).range(['green', 'red']);

  rectangles
    .attr('height', 20) //a predefined value for the height of a single data bar
    .attr('width', (d) => {return d.rating * 7})
    .attr('x', 0)
    .attr('y', (d,i) => {return i * (20 + 5)})
    .attr('fill', (d) => cscale(d))
    .select('title').text(d => {return d.rating})
  }

populate()