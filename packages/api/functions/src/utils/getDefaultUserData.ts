const getDefaultUserData = (userName, password) => {
  return {
    userName,
    password,
    lastUpdate: Date.now(),
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