export const delay = async (time: number) => {
  new Promise((resolve) => {
    setTimeout(() => resolve(1), time)
  })
}