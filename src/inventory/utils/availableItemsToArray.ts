export default (availableItems, allItems, textFilter) => {
  let listItems = availableItems.map(id => ({ 
    id, 
    name: allItems[id].name, 
    category: allItems[id].category  
  }))
  if (textFilter.length) {
    listItems = listItems.filter(item => 
      item.name.toLowerCase().includes(textFilter.toLowerCase())
    )
  }
  return listItems;
}