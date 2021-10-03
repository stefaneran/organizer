// Takes a flat list of items that belong in categories, and returns a structured JSON serialized by category names
// Note: Used for nested lists like in Inventory and Activities
function categorizeItems<Type>(items: Type[], categoryString: string): Record<string, Type[]> {

  const categories: Record<string, Type[]> = {};

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

export default categorizeItems;