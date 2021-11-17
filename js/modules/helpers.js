
/**
 * @description Check if the parameter is type of Number and round it up.
 * @param {Number} Number a numerical value that needst to be rounded up.
 * @returns A number
 */
export const roundNumber = (Number) => {
  return typeof(Number) === 'number' ? Math.round(Number) : console.error('cannot convert non numerical value')
}

/**
 * @description create a url path for images with the themoviedb img link and slug from dataset.
 * @param {URL} IMAGE_URL URL of the themoviedb img link
 * @param {String} slug slug of the image location
 * @returns Viable link that redirects to an image.
 */
export const createPath = (IMAGE_URL, slug) => {
  return `${IMAGE_URL}${slug}`
}

export const numberToGender = (Number) => {
  return Number === 1 ? 'Female' : 'Male'
}
