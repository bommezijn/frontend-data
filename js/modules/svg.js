export const dim = {
  margin: {t: 40, b: 10, l: 120, r:20},
  get height(){return 600 - this.margin.b - this.margin.t},
  get width(){return 900 - this.margin.r - this.margin.l},
  // get width(){return window.innerWidth}
}

export const createSVG = () => {
  return d3.select('body').append('svg')
    .attr('width', dim.width)
    .attr('height', dim.height)
    .attr('viewBox', `0 0 ${dim.width} ${dim.height}`)
    .style('border', '1px solid black')
}