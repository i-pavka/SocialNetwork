export const uId = () => {
  return `id-${(~~(Math.random()*1e8)).toString(16)}`
}
