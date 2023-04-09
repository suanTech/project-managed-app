export const delay = async (time: number) => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(1), time)
  })
}

export const formatDate = (date:Date):string => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}