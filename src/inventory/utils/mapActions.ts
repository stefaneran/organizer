export default (props) => ({
  getAll: props.getAll,
  inventory: {
    addToAll: props.addToAllItems,
    removeFromAll: props.removeFromAllItems,
    addToAvailable: props.addToAvailable,
    addNewToAvailable: props.addNewToAvailable,
    removeFromAvailable: props.removeFromAvailable
  },
  cart: {
    add: props.addToCart,
    addNew: props.addNewToCart,
    remove: props.removeFromCart,
    updateSelected: props.updateSelectedInCart,
    finishShopping: props.finishShopping
  }
})