console.log('hello JS')

const dimensions = {
  margin: {t: 40, b: 10, l: 120, r:20},
  get width(){return 800 - this.margin.l - this.margin.r},
  get height(){return 700 - this.margin.b - this.margin.t},
  barHeight: 20
}

/* Async / then function that retrieves data and creates consumable objects, returns promise */
// async function getData() {
//   const data = await d3.json('https://api.themoviedb.org/3/person/popular?api_key=63b8e2e812b6172f220bb5bb9aab2dea')
//     .then(
//       data => {
//         console.log(data.results)
//         return data.results.map(x => {
//         const actor = {
//           name: x.name,
//           mugshot: x.profile_path,
//           rating: x.popularity
//         }
//         return actor
//       })
//     })

//     return data
//   }

// Pure Async data retrieval function with proper error handling
const retrieveData = async () => {
  try {
    const test = await d3.json('https://api.themoviedb.org/3/person/popular?api_key=63b8e2e812b6172f220bb5bb9aab2dea')
    return await test.results.map(x => {
      const celeb = {name: x.name, mugshot: x.profile_path, rating: x.popularity}
      return celeb
    })
  } catch (error) {
    console.log(error)
    d3.select('body').append('h1').text('no Data')
  }
}

/* Extended variant of creating chart, modularized per step */
// Create SVG container and returns the element
const createSVG = () => {
  const SVG = d3.select('body').append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)
    .style('border', '1px solid black')
  return SVG
}

// Create group that houses the graph
const createGroup = (parent) => {
  const GROUP = parent.append('g')
    // .attr('transform', `translate(${dimensions.margin.l}, ${dimensions.margin.t})`) //uncomment for padding
  return GROUP
}

// Create scales
// const scale = (data) => {
//   d3.scaleBand().domain([0,1,2,3,4,5,6,7,8,9,10]).range([0,100])
//   // d3.scaleBand().domain(d3.extent(data)).range([0,100])
// }

const scale = d3.scaleLinear().domain([0,10]).range([0,dimensions.width - dimensions.margin.l]) //use width for length of scale
  // d3.scaleBand().domain(d3.extent([0,10])).range([0,100])
// Create axis
const xAxis = d3.axisBottom().scale(scale)


var x = d3.scaleLinear().range([0, dimensions.width]);
var y = d3.scaleLinear().range([dimensions.height, 0]);
// gridlines in x axis function
function make_x_gridlines() {		
  return d3.axisBottom(x)
      .ticks(10)
}

// gridlines in y axis function
function make_y_gridlines() {		
  return d3.axisLeft(y)
      .ticks(10)
}


// Create graph function, requires SVG, group and async data 
const createGraph = async () => {
  const GROUP = createGroup(createSVG())

  GROUP.append('g').classed('x.axis', true).attr("transform", `translate(0, ${dimensions.height - dimensions.margin.t})`).call(xAxis) //Plot scale with height - 20 // x axis

  GROUP.append("g")			
  .attr("class", "grid")
  .attr("transform", `translate(0,${dimensions.height})`)
  .call(make_x_gridlines()
      .tickSize(-dimensions.height)
      .tickFormat("")
  )
  GROUP.append("g")			
  .attr("class", "grid")
  .call(make_y_gridlines()
      .tickSize(-dimensions.width)
      .tickFormat("")
  )
// Create future reference for the bar chart within a group, enter data and join it.
  const RECTANGLE =
    GROUP.selectAll('rect')
      .data(await retrieveData())
      .join(
        (enter) => {
          const r = enter.append('rect')
          r.append('title')
          return r},
        (update) => update,
        (exit) => exit.remove()
      );

  //style rectangles
  RECTANGLE
    .attr('height', dimensions.barHeight)
    .attr('width', (d) => d.rating * 5)
    .attr('y', (d,i) => i*(dimensions.barHeight + 5))
    .attr('class', 'bars')
    .select('title').text(d => d.rating)

}

createGraph()

/* Shorthand IIFE bar chart graph */
// (async () => {
//   d3.select('body')
//     .append('svg')
//     .attr('height', '80vh')
//     .attr('width', '100%')
//     .style('border', '1px solid black')
//     .append('g')
//     .attr('transform', 'translate(20, 20)')
//     .selectAll('rect')
//     .data(await retrieveData())
//     .join(
//       (enter) => {
//         const rectangle = enter.append('rect')
//           .attr('x', 0)
//           rectangle.append('title')
//         return rectangle
//       }
//     )
//     .attr('height', dimensions.barHeight)
//     .attr('width', d => d.rating * 5)
//     .attr('y', (d,i) => i*(dimensions.barHeight+5))
//     .attr('class', 'bars')
//     .select('title').text(d => d.rating)
// })();
