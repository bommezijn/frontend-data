console.log('hello JS')

const dimensions = {
  margin: {t: 40, b: 10, l: 120, r:20},
  get width(){return 800 - this.margin.l - this.margin.r},
  get height(){return 600 - this.margin.b - this.margin.t},
  barHeight: 20
}

/* Async / then function that retrieves data and creates consumable objects, returns promise */
// async function getData() {
//   const data = await d3.json('https://api.themoviedb.org/3/person/popular?api_key=')
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
    const test = await d3.json('https://api.themoviedb.org/3/person/popular?api_key=')
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
// // Create SVG container and returns the element
// const createSVG = () => {
//   const SVG = d3.select('body').append('svg')
//     .attr('width', dimensions.width)
//     .attr('height', dimensions.height)
//     .style('border', '1px solid black')
//   return SVG
// }

// // Create group that houses the graph
// const createGroup = (parent) => {
//   const GROUP = parent.append('g')
//     .attr('transform', `translate(${dimensions.margin.l}, ${dimensions.margin.t})`)
//   return GROUP
// }

// // Create graph function, requires SVG, group and async data 
// const createGraph = async () => {
//   const GROUP = createGroup(createSVG())

// // Create future reference for the bar chart within a group, enter data and join it.
//   const RECTANGLE =
//     GROUP.selectAll('rect')
//       .data(await getData())
//       .join(
//         (enter) => enter.append('rect'),
//         (update) => update,
//         (exit) => exit.remove()
//       );

//   //style rectangles
//   RECTANGLE
//     .attr('height', dimensions.barHeight)
//     .attr('width', (d) => d.rating * 5)
//     .attr('y', (d,i) => i*(dimensions.barHeight + 5))
//     .attr('class', 'bars')
// }

// createGraph()

/* Shorthand IIFE bar chart graph */
(async () => {
  d3.select('body')
    .append('svg')
    .attr('height', '80vh')
    .attr('width', '100%')
    .style('border', '1px solid black')
    .append('g')
    .attr('transform', 'translate(20, 20)')
    .selectAll('rect')
    .data(await retrieveData())
    .join(
      (enter) => {
        const rectangle = enter.append('rect')
          .attr('x', 0)
          rectangle.append('title')
        return rectangle
      }
    )
    .attr('height', dimensions.barHeight)
    .attr('width', d => d.rating * 5)
    .attr('y', (d,i) => i*(dimensions.barHeight+5))
    .attr('class', 'bars')
    .select('title').text(d => d.rating)
})();