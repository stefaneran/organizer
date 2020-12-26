export default (props) => ({
  inventory: {
    getAll: props.getAllItems,
    addToAll: props.addToAllItems,
    removeFromAll: props.removeFromAllItems,
    getAvailable: props.getAvailable,
    addToAvailable: props.addToAvailable,
    addNewToAvailable: props.addNewToAvailable,
    removeFromAvailable: props.removeFromAvailable
  },
  cart: {
    get: props.getCart,
    add: props.addToCart,
    addNew: props.addNewToCart,
    remove: props.removeFromCart,
    updateSelected: props.updateSelectedInCart,
    finishShopping: props.finishShopping
  }
})