import genericSort from '@core/utils/genericSort';

export default (allItems, targetCollection) => {
  const names = [];
  Object.keys(allItems).forEach(id => {
    if (!targetCollection.includes(id)) {
      names.push({ 
        label: allItems[id].name, 
        value: id 
      });
    }
  })
  return names.sort((a, b) => genericSort(a.label, b.label));
}