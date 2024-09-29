export const useEmpty = () => {
  const isValidObject = (obj) => {
    return (
      obj &&
      typeof obj === "object" &&
      !Array.isArray(obj) &&
      Object.keys(obj).length > 0
    );
  };

  const isValidArray = (arr) => {
    return Array.isArray(arr) && arr.length > 0;
  };

  return { isValidObject, isValidArray };
};
