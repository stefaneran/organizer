import ActivityLocation from './ActivityLocation.interface';
import ActivityType from './ActivityType.enum';
import ParticipantType from './ParticipantType.enum';

interface Activity {
  name: string;
  locations: ActivityLocation[];
  activityType: ActivityType;
  participantType: ParticipantType[]; 
}

export default Activity;