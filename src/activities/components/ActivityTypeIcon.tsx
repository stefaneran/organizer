import * as React from 'react';
import ActivityType from '@activities/interfaces/ActivityType.enum';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SchoolIcon from '@material-ui/icons/School';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import GamepadIcon from '@material-ui/icons/Gamepad';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import CommuteIcon from '@material-ui/icons/Commute';
import StarIcon from '@material-ui/icons/Star';

const ActivityTypeIcon = ({ activityType, style = {} }) => {

  const iconMap = {
    [ActivityType.Food]: <LocalDiningIcon style={style} />,
    [ActivityType.Drinks]: <LocalCafeIcon style={style} />,
    [ActivityType.Cultural]: <LocalLibraryIcon style={style} />,
    [ActivityType.Educational]: <SchoolIcon style={style} />,
    [ActivityType.Fitness]: <FitnessCenterIcon style={style} />,
    [ActivityType.Sport]: <GolfCourseIcon style={style} />,
    [ActivityType.Games]: <GamepadIcon style={style} />,
    [ActivityType.Entertainment]: <ConfirmationNumberIcon style={style} />,
    [ActivityType.Trip]: <CommuteIcon style={style} />,
    [ActivityType.Other]: <StarIcon style={style} />
  }

  return iconMap[activityType] || null;
}

export default ActivityTypeIcon;