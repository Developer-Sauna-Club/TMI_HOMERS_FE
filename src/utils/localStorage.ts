export const setItemToStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getItemFromStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value;
};

export const removeItemFromStorage = (key: string) => {
  localStorage.removeItem(key);
};
