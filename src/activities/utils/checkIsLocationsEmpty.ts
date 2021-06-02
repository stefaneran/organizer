export default (locations = []) => {
  for (const location of locations) {
    const { name, address } = location;
    if (name.length || address.length) {
      return false;
    }
  }
  return true;
}