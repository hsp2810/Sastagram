export const getInititals = (name: string | null) => {
  if (!name) return "";
  const arr = name.split(" ");
  const firstChar = arr[0].charAt(0).toUpperCase();
  const secondChar = arr[1].charAt(0).toUpperCase();
  return firstChar + secondChar;
};
