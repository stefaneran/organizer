// Note: Some properties are not part of a proper event object, but needed here for UI reasons 
// (ex: Selecting an activity type even though we use eventId only)

export default {
  title: '',
  participants: [],
  activityId: '',
  activityLocationIndex: 0,
  date: Date.now()
}