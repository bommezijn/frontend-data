
export const roundNumber = (Number) => {
  return typeof(Number) === 'number' ? Math.round(Number) : console.error('cannot convert non numerical value')
}

export const createPath = (IMAGE_URL, slug) => {
  return `${IMAGE_URL}${slug}`
}

export const numberToGender = (Number) => {
  return Number === 1 ? 'Female' : 'Male'
}