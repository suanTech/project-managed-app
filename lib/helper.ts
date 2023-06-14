export const delay = async (time: number) => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(1), time);
  });
};

export const formatDate = (date: Date | string, version: "long" | "short"): string => {
  let formattedDate = '';
  if (version === "short") {
    formattedDate = new Date(date).toLocaleDateString("en-GB");
  }
  if (version === "long") {
    formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return formattedDate;
};
