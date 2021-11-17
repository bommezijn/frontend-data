import {roundNumber, createPath, numberToGender} from './helpers.js'

export const dataset = async (url) => {
  try {
    const data = d3.json(url)
    return await data
  } catch (error) {
    console.error(error)
  }
}


const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
export const sanitizeData = async (data) => {
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