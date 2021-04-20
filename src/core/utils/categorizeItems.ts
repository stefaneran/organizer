// Takes a flat list of items that belong in categories, and returns a structured JSON serialized by category names
// Note: Used for nested lists like in Inventory and Activities
export default (items, categoryString) => {
  const categories = {};
  items.forEach(item => {
    const category = item[categoryString];
    if (!categories[category]) {
      categories[category] = [item];
    }
    else {
      categories[category].push(item);
    }
  })
  return categories;
}