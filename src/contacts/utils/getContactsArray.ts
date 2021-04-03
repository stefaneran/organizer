
const isInGroup = (contact, group) => {
  return group === 'All' || contact.groups.includes(group);
}

export default (contacts, filters) => {
  const contactsArray = Object.keys(contacts).map(contactId => ({
    id: contactId,
    ...contacts[contactId]
  }));
  const filteredContacts = contactsArray.filter(contact => 
    isInGroup(contact, filters.group)
  )
  return filteredContacts;
}