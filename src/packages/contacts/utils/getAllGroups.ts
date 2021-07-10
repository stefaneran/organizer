import { Contact } from "@contacts/types";

export default (contacts: Record<string, Contact>) => {
  const allGroups = [];
  for (const id in contacts) {
    const contactGroups = contacts[id].groups;
    for (const contactGroup of contactGroups) {
      if (!allGroups.includes(contactGroup)) {
        allGroups.push(contactGroup);
      }
    }
  }
  return allGroups;
}