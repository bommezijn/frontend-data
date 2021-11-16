export const dim = {
  margin: {t: 40, b: 10, l: 120, r:20},
  get height(){return 800 - this.margin.b - this.margin.t},
  get width(){return 1000 - this.margin.r - this.margin.l},
  // get width(){return window.innerWidth}
}

/**
 * 
 * @param {Number} width A numerical value for the size of the SVG, defaults to dim.width
 * @param {Number} height A numericala value for the size of the SVG, defaults to dim.height
 * @returns SVG within the body element
 */
export const createSVG = (width = dim.width, height = dim.height ) => {
  return d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('border', '1px solid black')
}