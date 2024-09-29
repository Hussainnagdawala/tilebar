function formatDateString(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const convertedData = `${day}/${month}/${year}`;
  if (convertedData === "NaN/NaN/NaN") {
    return isoDate;
  } else {
    return `${day}/${month}/${year}`;
  }
}

export const formatTime = (isoString) => {
  const date = new Date(isoString);
  const time = date.toTimeString()?.split(" ")[0];
  return time;
};

export const useFormat = () => {
  return {
    formatDateString,
    formatTime,
  };
};
