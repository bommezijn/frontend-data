
const getData = async (URL) => {
  try {
    const sender = await d3.json(URL)
    return await sender.results
  } catch (error) {
    console.log(error)
    d3.select('body').append('h1').text('no data')
  }
}

export default getData;