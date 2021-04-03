export default (contacts) => {
  const allGroups = [];
  for (const id of Object.keys(contacts)) {
    const contactGroups = contacts[id].groups;
    for (const contactGroup of contactGroups) {
      if (!allGroups.includes(contactGroup)) {
        allGroups.push(contactGroup);
      }
    }
  }
  return allGroups;
}