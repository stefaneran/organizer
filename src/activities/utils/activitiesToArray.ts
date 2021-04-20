export default (activities, textFilter, participantFilter) => {
  let listItems = Object.keys(activities).map(id => ({ 
    id, 
    name: activities[id] ? activities[id].name : '', 
    locations: activities[id] ? activities[id].locations : '',
    activityType: activities[id] ? activities[id].activityType : '',
    participantType: activities[id] ? activities[id].participantType : '',
  }))
  if (textFilter.length) {
    listItems = listItems.filter(item => 
      item.name.toLowerCase().includes(textFilter.toLowerCase())
    )
  }
  if (participantFilter !== 'All') {
    listItems = listItems.filter(item => 
      item.participantType.includes(participantFilter)
    )
  }
  return listItems;
}