const isItemAvailable = (item, availableItems) => availableItems.includes(item.id);
const isItemInCart = (item, cart) => cart.includes(item.id);

export default (item, cart, availableItems) => {
  // If item missing from inventory, but is in cart
  if (!isItemAvailable(item, availableItems) && isItemInCart(item, cart)) {
    // Return yellow
    return 'rgb(255, 231, 76)';
  }
  // If item is missing
  else if (!isItemAvailable(item, availableItems)) {
    // Return red
    return 'rgb(255, 89, 100)';
  }
  return '';
}