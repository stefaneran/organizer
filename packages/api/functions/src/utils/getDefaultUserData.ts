const getDefaultUserData = (userName, password) => {
  return {
    userName,
    password,
    lastRecipeUpdate: Date.now(),
    lastInventoryUpdate: Date.now(),
    lastActivityUpdate: Date.now(),
    lastContactUpdate: Date.now(),
    groceries: [],
    inventory: [],
    cart: [],
    cartSelected: [],
    recipes: [],
    contacts: [],
    events: [],
    activities: []
  }
}

export default getDefaultUserData;