export default (contacts) => {
  const groups = [];
  Object.keys(contacts).forEach(contactId => {
    contacts[contactId].groups.forEach(group => {
      if (!groups.includes(group)) {
        groups.push(group);
      }
    })
  })
  return groups;
}