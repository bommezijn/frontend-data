console.log('hello JS')

const dimensions = {
  margin: {t: 40, b: 10, l: 120, r:20},
  get width(){return 800 - this.margin.l - this.margin.r},
  get height(){return 600 - this.margin.b - this.margin.t},
}

const FAKEDATA = [33, 88, 54, 102, 55];
async function main() {
  const data = d3.json('https://api.themoviedb.org/3/person/popular?api_key=63b8e2e812b6172f220bb5bb9aab2dea')
    .then(
      data => {
        return data.results.map(x => {
        const actor = {
          name: x.name,
          mugshot: x.profile_path,
          rating: x.popularity
        }
        return actor
      })
    })

  const SVG = d3.select('body').append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)
    .attr('border', '1px solid black')

  const GROUP = SVG.append('g')
    .attr('transform', `translate(${dimensions.margin.l}, ${dimensions.margin.t})`)


    const RECTANGLE =
    GROUP.selectAll('rect')
      .data(await data)
      .join(
        (enter) => enter.append('rect').attr('x',0),
        (update) => update,
        (exit) => exit.remove()
    );

    RECTANGLE
    .attr('height', 50)
    .attr('width', (d) => d.rating * 7)
    .attr('y', (d,i) => i*(50+5))
    .attr('class', 'bars')
}

main()


