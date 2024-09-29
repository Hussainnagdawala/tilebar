export const useLocalStorage = () => {
  const add = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const remove = (key) => {
    localStorage.removeItem(key);
  };
  const load = (key) => {
    const stored = localStorage.getItem(key);
    return stored == null ? undefined : JSON.parse(stored);
  };
  const clear = () => {
    localStorage.clear();
  };
  return {
    add,
    remove,
    load,
    clear,
  };
};
