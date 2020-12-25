export default (props) => ({
  inventory: {
    getAll: props.getAllItems,
    addToAll: props.addToAllItems,
    removeFromAll: props.removeFromAllItems,
    getAvailable: props.getAvailable,
    addToAvailable: props.addToAvailable,
    removeFromAvailable: props.removeFromAvailable
  },
  cart: {
    get: props.getCart,
    add: props.addToCart,
    remove: props.removeFromCart
  }
})