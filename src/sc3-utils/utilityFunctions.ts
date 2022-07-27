export const utilityFunctions = () => {
  return `id-${(~~(Math.random()*1e8)).toString(16)}`
}

export const scrollTop = () => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, 500)
}
