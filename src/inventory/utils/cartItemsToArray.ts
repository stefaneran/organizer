export default (cart, allItems) => 
  cart.map(id => ({ 
    id, 
    name: allItems[id] ? allItems[id].name : '', 
    category: allItems[id] ? allItems[id].category : ''  
  }))