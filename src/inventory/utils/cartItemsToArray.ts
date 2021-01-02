export default (cart, allItems) => 
  cart.map(id => ({ 
    id, 
    name: allItems[id].name, 
    category: allItems[id].category  
  }))