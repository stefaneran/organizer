export default (items) => {
  const categories = {};
  items.forEach(item => {
    const { id, category, name } = item;
    if (!categories[category]) {
      categories[category] = [item];
    }
    else {
      categories[category].push(item);
    }
  })
  return categories;
}