export default (contacts) => {
  const subgroups = [];
  contacts.forEach(contact => {
    contact.subgroups.forEach(subgroup => {
      if (!subgroups.includes(subgroup)) {
        subgroups.push(subgroup);
      }
    })
  })
  return subgroups;
}