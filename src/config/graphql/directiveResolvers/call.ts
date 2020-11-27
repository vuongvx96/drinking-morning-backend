const call = (next, src, args, context) => {
  return next().then(str => {
    return str
  })
}

export default call