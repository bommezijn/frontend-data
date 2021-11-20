console.log(`%cHello JS`, `color: #ffcc00; font-weight: bold;`)
import {sanitizeData, dataset} from './modules/data.js'
const API = 'https://api.themoviedb.org/3/person/popular?api_key=63b8e2e812b6172f220bb5bb9aab2dea'

//Define dimensions used for the SVG, width and height are a calculation, so for objects its a getter function
const dimensions = {
  margin: {t:20, r: 20, b: 30, l: 40},
  get width() {return window.innerWidth - this.margin.l - this.margin.r},
  get height() {return 600 - this.margin.t - this.margin.b}
}


/* 
  SVG variable is a d3.select chain which creates a div for the graph with an SVG in it and gives the following attributes
  * Width, calculation of width + margin left + margin right
  * Height, calculation of width + margin top + margin bottom + 50 for extra space
  And creates a group within the svg (with a translate to simulate a margin and padding within the svg)
*/
const SVG = d3.select('body').append('div').attr('id', 'graph').append('svg')
  .attr('width', dimensions.width + dimensions.margin.l + dimensions.margin.r)
  .attr('height', dimensions.height + dimensions.margin.t + dimensions.margin.b + 50)
  .append('g')
    .attr('class', 'barChart')
    .attr('transform', `translate(${dimensions.margin.l}, ${dimensions.margin.t})`)

/**
   * @title CURRENTLY DISABLED CUZ OF AN ISSUE
   * @description Creates Axis and scales for the graph. Specifically a scaleBand and scaleLinear
   * @see {@link https://github.com/suwigyarathore/chart-examples/blob/555e608e78bedeac0fe4dcc541819236c08cdc02/scatter-line/main.js#L30} for reference of the codestyle from suwigyarathore.
   * @param {JSON} data dataset that the graph uses to generate the scaleBand and scaleLinear
   * @returns Methods X and Y
 */
// const createAxis = (data) => {
//   const X = d3.scaleBand() //scale for ordinal or categorical dimensions.
//     .domain(data.map(d => d.name)) //Data it needs to map to the ranges
//     .range([0, dimensions.width]) //Plots domain elements to a 'physical' location on the graph
//     .paddingInner(0.2)

//     SVG.append('g')
//     .attr('class', 'xAxis')
//     .attr('transform', `translate(0, ${dimensions.height})`)
//     .call(d3.axisBottom(X)) //Plot X axis (scaleBand) to the bottom
//     // .attr('fill', '#ffffff20')
//     .selectAll('text')
//       .attr('transform', `translate(-10,0) rotate(-45)`) //Rotate text for easier reading.
//       // .attr('fill', 'white')
//       .style('text-anchor', 'end')

//   const Y = d3.scaleLinear()
//     .domain([0, d3.max(data, d=> {return d.rating})]) //Create a horizontal scale from 0 to the max value of the dataset. Use max instead of extent for the sake of 0 start value
//     .range([dimensions.height, 0]);

    
//     SVG.append('g')
//     .attr('class', 'yAxis')
//     .call(d3.axisLeft(Y)) //Plot Y axis (scaleLinear) to the left
//     // .attr('fill', '#ffffff20')
//       .selectAll('text')
//       // .attr('fill', 'white')
    

//   return { X, Y};
// }

//setup scales
const xscale = d3.scaleBand().range([0, dimensions.width]).padding(0.2)
const yscale = d3.scaleLinear().range([dimensions.height, 0])

//setup axis
const xaxis = d3.axisBottom(xscale)
const group_xaxis = SVG.append('g').attr('class', 'x axis')
  group_xaxis.attr('transform', `translate(0, ${dimensions.height})`)

const yaxis = d3.axisLeft(yscale)
const group_yaxis = SVG.append('g').attr('class', 'y axis')


/**
 * @description Render graph with bars and scales
 * @param {JSON} data data from an API endpoint, specifically data sanitized by sanitizeData()
 */
async function render(data) {

  xscale.domain(data.map(d => d.name))
  yscale.domain([0, d3.max(data, d=> {return d.rating})])

  // render the axis
  group_xaxis.transition().call(xaxis)
    .selectAll('text')
    .attr('transform', `translate(-10,0) rotate(-45)`)
    .style('text-anchor', 'end')
  group_yaxis.transition().call(yaxis);
  // const {X, Y} = createAxis(data)

  const rec = SVG
    .selectAll('rect')
    .data(data)
    .join(
      (enter) => {
        const r = enter.append('rect')
        r
        .style('opacity',0.75)
        .append('title')
        return r
    },
    (update) => {
      return update.transition().style('fill','#DC5A41')
    },
    (exit) => {return exit.remove()})

    rec
      .transition()
      .ease(d3.easeQuadIn)
      .delay((d,i) => {return i*80})
        .attr('class', 'bar') //Why give it a class?
        .attr('x', (d) => {return xscale(d.name)})
        .attr('width', xscale.bandwidth())
        .attr('y', (d) => {return yscale(d.rating)})
        .transition()
          .style('fill', '#B61544')
          .attr('height', (d) => {return dimensions.height - yscale(d.rating)})  
          .select('title').text(d => {return `${d.name}: ${d.rating}`});


      
  // const rec_num = SVG
  //   d3.selectAll('p')
  //   .data(data)
  //   .join(
  //     (enter) => {
  //       const t = enter.append('text');
  //        t
  //         .transition()
  //         .ease(d3.easeLinear)
  //         .delay((d,i) => {return i*50})
  //       return t
  //     },
  //     (update) => {
  //       return update.style('opacity', 0.5)
  //     },
  //     (exit) => {
  //       return exit.remove()
  //     }
  //   )

  //   // .append('text')
  //   rec_num
  //     .attr('opacity', 0)
  //     .transition()
  //     .text((d) => {return d.rating})
  //     .attr('x', (d) => {return xscale(d.name) + xscale.bandwidth() / 2})
  //     .attr('y', (d) => {return yscale(d.rating) + 14})
  //     .attr('font-size', '11px')
  //     .attr('fill', 'white')
  //     .attr('text-anchor', 'middle')
  //       .transition()
  //       .ease(d3.easeQuadIn)
  //       .delay((d,i) => {return i*100})
  //       .attr('opacity', 1)

}



/* 
  Ultra ugly way of iterating through the data. With a hard stop.
  Should update it to something that is dynamic.
*/
const pages = {
  0: await sanitizeData(await dataset(`${API}&page=1`)),
  1: await sanitizeData(await dataset(`${API}&page=2`)),
  2: await sanitizeData(await dataset(`${API}&page=3`)),
  3: await sanitizeData(await dataset(`${API}&page=4`)),
  4: await sanitizeData(await dataset(`${API}&page=5`)),
  5: await sanitizeData(await dataset(`${API}&page=6`)),
  6: await sanitizeData(await dataset(`${API}&page=7`)),
  7: await sanitizeData(await dataset(`${API}&page=8`))
}

// console.log()

const updateRender = (endPoint = pages[0]) => {
  render(endPoint)
}

updateRender()
let i = 0;

const button = d3.select('.next')
  button.on('click', () => {
    i++
    updateRender(pages[i])
  })
