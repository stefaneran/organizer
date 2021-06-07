type arg = number | string;

export default (a: arg, b: arg): number => {
  if (a < b) return -1
  else return 1;
}