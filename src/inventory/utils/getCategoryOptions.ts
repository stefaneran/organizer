import genericSort from '@core/utils/genericSort';

export default (categoryValue, allItems) => {
  const categories = [];
  Object.keys(allItems).forEach(id => {
    const { category } = allItems[id];
    const containsValue = categoryValue.length ? 
      category.toLowerCase().includes(categoryValue.toLowerCase()) : true;
    if (!categories.includes(category) && containsValue) {
      categories.push(category);
    }
  })
  return categories.sort((a, b) => genericSort(a, b));
}