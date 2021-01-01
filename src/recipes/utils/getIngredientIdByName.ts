export default (name, allItems) => {
  for (let i = 0; i < Object.keys(allItems).length; i += 1) {
    const itemId = Object.keys(allItems)[i];
    const itemName = allItems[itemId].name;
    if (itemName === name) {
      return itemId;
    }
  }
  return undefined;
}