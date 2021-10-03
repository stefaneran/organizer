// Get the next index
export default ({
  currentIndex, 
  length, // The max an index can get to before having to stop/go back to 0
  direction, // Is it backward or forward
  canWrap // Can it go back to beginning like carousel or finish like a wizard
}: {
  currentIndex: number, 
  length: number, 
  direction: 1 | -1,
  canWrap?: boolean
}) => {
  const x = currentIndex + direction;
  if(direction < 0)
    return (x < 0) ? length - 1 : x;
  return (x >= length) ? (canWrap ? 0 : x - 1) : (x);
}