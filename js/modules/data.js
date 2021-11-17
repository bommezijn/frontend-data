import {roundNumber, createPath, numberToGender} from './helpers.js'

/**
 * @description API call with d3.json
 * @param {String} url API endpoint from which d3.json needs to retrieve data from
 * @returns Promise (with a JSON object)
 */
export const dataset = async (url) => {
  try {
    const data = d3.json(url)
    return await data
  } catch (error) {
    console.error(error)
  }
}

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

/**
 * @description Sanitize data from dataset to a bitesized dataset
 * @param {JSON} data a JSON object which it needs to clean. Honed on the themoviedb 
 * @returns Promise with an object of cleaned data.
 */
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