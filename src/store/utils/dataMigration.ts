import { v4 } from 'uuid';

// Migrate old data to new shape
export default (data) => {

  const contacts = {};
  data.contacts.forEach(contact => {
    const id = v4();
    contacts[id] = {
      id,
      name: contact.name,
      location: contact.location,
      groups: contact.subgroups,
      relations: contact.relations,
      info: contact.info,
      lastInteraction: contact.lastActivity,
      hangouts: contact.interactionHistory.filter(log => log.type === 'Hangout').map(log => log.activityDate)
    }
  });

  const skills = {};
  data.skills.forEach(skill => {
    const id = v4();
    skills[id] = {
      id,
      name: skill.title,
      lastActivity: skill.lastActivity,
      priority: skill.priority,
      activity: 'Neglected',
      totalHours: skill.totalHours,
      totalXP: skill.totalXP,
      weekHourGoal: skill.weekHourGoal,
      notes: skill.notes,
      history: skill.history.map(log => {
        return {
          identifier: id,
          subType: log.subType,
          unit: log.unit,
          title: log.title,
          description: log.description,
          activityDate: log.activityDate
        }
      }),
      items: skill.items.map(item => {
        if (item.itemType === 'Book') { 
          return {
            itemType: item.itemType,
            name: item.title,
            totalXP: item.totalXP,
            dateCreated: item.dateCreated,
            dateFinished: item.dateFinished,
            lastActivity: item.lastActivity,
            activity: item.activity,
            priority: item.priority,
            author: item.author,
            pagesTotal: item.pagesTotal,
            pagesRead: item.pagesRead
          }
        }
        if (item.itemType === 'Course') {
          return {
            itemType: item.itemType,
            name: item.title,
            totalXP: item.totalXP,
            dateCreated: item.dateCreated,
            dateFinished: item.dateFinished,
            lastActivity: item.lastActivity,
            activity: item.activity,
            priority: item.priority,
            classesTotal: item.classesTotal,
            classesDone: item.classesDone,
            hoursPerClass: item.hoursPerClass
          }
        }
      }),
      archive: skill.archive.map(item => {
        if (item.itemType === 'Book') { 
          return {
            itemType: item.itemType,
            name: item.title,
            totalXP: item.totalXP,
            dateCreated: item.dateCreated,
            dateFinished: item.dateFinished,
            lastActivity: item.lastActivity,
            activity: item.activity,
            priority: item.priority,
            author: item.author,
            pagesTotal: item.pagesTotal,
            pagesRead: item.pagesRead
          }
        }
        if (item.itemType === 'Course') {
          return {
            itemType: item.itemType,
            name: item.title,
            totalXP: item.totalXP,
            dateCreated: item.dateCreated,
            dateFinished: item.dateFinished,
            lastActivity: item.lastActivity,
            activity: item.activity,
            priority: item.priority,
            classesTotal: item.classesTotal,
            classesDone: item.classesDone,
            hoursPerClass: item.hoursPerClass
          }
        }
      })
    }
  })

  return { contacts, skills };
}