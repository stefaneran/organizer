export default (props) => ({
  inventory: {
    addToAll: props.addToAllItems,
    removeFromAll: props.removeFromAllItems,
    addToAvailable: props.addToAvailable,
    addNewToAvailable: props.addNewToAvailable,
    removeFromAvailable: props.removeFromAvailable,
    edit: props.editItem
  },
  cart: {
    add: props.addToCart,
    addNew: props.addNewToCart,
    remove: props.removeFromCart,
    updateSelected: props.updateSelectedInCart,
    finishShopping: props.finishShopping
  }
})