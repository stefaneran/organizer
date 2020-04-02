// copypasta - getIndexByDirection
export default (currentIndex: number, length: number, direction: 1 | -1) => {
  const x = currentIndex + direction;
  if(direction < 0)
    return (x < 0) ? length - 1 : x;
  return (x >= length) ? 0 : x;
}