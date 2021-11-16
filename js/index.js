console.log(`%cHello World`, `color: #ffcc00; font-weight: bold;`)
import getData from './modules/data.js';
import {dim, createSVG} from './modules/svg.js'

// const WIDTH = 600, HEIGHT = 800;
const SVG = createSVG()

const API = 'https://api.themoviedb.org/3/person/popular?api_key=63b8e2e812b6172f220bb5bb9aab2dea'

const dataset = getData(API).then(whole =>
  whole.map(specified => {
    const CELEB = {
      name: specified.name,
      rating: Math.round(specified.popularity),
      mug: `https://image.tmdb.org/t/p/w500/${specified.profile_path}`
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
  const X = d3.scaleBand()
    .range([0, dim.width])
    .domain(data.map(d => d.name))
    .padding(0.2)

  SVG.append('g')
    .attr('transform', `translate(0, ${dim.height})`)
    .call(d3.axisBottom(X))
    .selectAll('text')
      .attr('transform', `translate(-10,0)rotate(-45)`)
      .style('text-anchor', 'end')

  const Y = d3.scaleLinear()
    .range([dim.height, 0])
    .domain([0, d3.max(data, d => {return d.rating})])

  SVG.append('g')
    .call(d3.axisLeft(Y))
  /* Create X axis based on the value from rating */
  const X_AXIS = d3.scaleLinear()
    .domain(d3.extent(data, d => d.rating))
    .range([0, dim.width]);

  // // Add X axis to the bottom axis
  // SVG.append('g')
  // .attr('transform', `translate(0,  ${dim.height - dim.margin.t})`) //push scale down
  // .call(d3.axisBottom(X_AXIS))
  
  // /* Create Y axis based on the value from name */
  // const Y_AXIS = d3.scaleBand() //shouldn't be ordinal but scaleband, not sure why but it works.
  //   .domain(data.map(d => {return d.name}))
  //   .range([0, dim.height]) //Depending on the starting value the data gets sorted U -> D or D-> U && 50 to center the label with bar

  // // Add Y axis to the right
  // SVG.append('g')
  // .attr('transform', `translate(${dim.width - dim.margin.r})`)
  //   .call(d3.axisLeft(Y_AXIS))

  // return {X_AXIS, Y_AXIS};
  return {X, Y};
}

const render = async (dataset) => {
  const {X, Y} = createAxis(await dataset) 
  // SVG.attr('transform', `translate(20, 20)`) //Padding to remove the SVG from the corner of the screen
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
  
  rectangles
    // .attr('height', 20) //a predefined value for the height of a single data bar
    // .attr('height', (dim.height / Y.bandwidth())) //a predefined value for the height of a single data bar
    .attr('height', d => dim.height - Y(d.rating)) //a predefined value for the height of a single data bar
    // .attr('width', (d) => {return dim.width * (`0.${d.rating}`)})
    .attr('width', X.bandwidth())
    .attr('x', d => X(d.name))
    .attr('y', d => Y(d.rating)) //The 5 is the padding between. Should be done differently
    .attr('fill', '#B61544')
    .select('title').text(d => {return d.rating})
  }

render(await dataset)

// note to future self, I added Y_AXIS.bandwith() to line 74 and 77. This made all the bars fill the height of the entire group and making it equal to the axisLeft.
// Currently there is this issue with the width of the graph, it does not correlate to the bars or the axis. This has to be fixed.
// Another thing that has to be fixed is the positioning of the graph itself and the axis 
// Besides that it needs interactivity, thus I have to find something within the dataset to compare or filter to. an Idea would be to get the best movies or somethign

