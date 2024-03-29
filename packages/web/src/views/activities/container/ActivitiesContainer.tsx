import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { getActivities, deleteActivity } from 'activities/store/thunks';
// Icons
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
// Components
import ActivitiesToolbar from 'activities/components/ActivitiesToolbar';
import ActivityNestedList from 'activities/components/ActivityNestedList';
import ActivityInfo from 'activities/components/ActivityInfo';
import ActivityFilters from 'activities/components/ActivitiesFilters';
import ConfirmationDialog from '@core/components/ConfirmationDialog';
import SlidingPanel from '@core/components/SlidingPanel';
// Utils
import { checkStoreDataSyncInLocalStorage } from '@core/localstorage/lastUpdate';
import getActivitiesArray from 'activities/utils/getActivitiesArray';
import defaultFilters from 'activities/utils/defaultActivityFilters';
// Types
import { OrganizerModule, AppDispatch, RootState } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '100%',
    marginTop: '1em',
    overflow: 'hidden',
    position: 'relative'
  },
  contentContainer: {
    display: 'flex',
    height: '88%',
    transition: 'width 300ms',
    paddingTop: '1em'
  },
  primaryContainer: {
    transition: 'width 300ms',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    paddingRight: '1em',
    paddingLeft: '1em'
  }
}));

const ActivitiesContainer: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { activities, lastUpdate } = useSelector((state: RootState) => state.activitiesStore)
  const { loggedIn } = useSelector((state: RootState) => state.app.user)

  const [selectedActivity, setSelectedActivity] = React.useState("");
  const [activityFilters, setActivityFilter] = React.useState(defaultFilters);
  const [isInfoPanelOpen, setInfoPanelOpen] = React.useState(false);
  const [isFiltersPanelOpen, setFiltersPanelOpen] = React.useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

  const activitiesList = React.useMemo(() => 
    getActivitiesArray(activities, activityFilters), 
    [activities, activityFilters]
  );

  React.useEffect(() => {
    const isDataUpToDate = checkStoreDataSyncInLocalStorage(OrganizerModule.Activities, lastUpdate);
    if (loggedIn && !isDataUpToDate) {
      dispatch(getActivities());
    }
  }, [loggedIn])

  const toggleFilterPanel = () => {
    setFiltersPanelOpen(!isFiltersPanelOpen);
  }
  const toggleConfirmationDialog = () => {
    setConfirmationOpen(!isConfirmationOpen);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeFilter = (property: string) => (eventOrValue: any) => {
    const value = eventOrValue.target?.value ?? eventOrValue;
    setActivityFilter({
      ...activityFilters,
      [property]: value
    })
  }
  const handleOpenInfoPanel = (activityId?: string) => {
    setSelectedActivity(typeof activityId === 'string' ? activityId : '');
    setInfoPanelOpen(true);
  }
  const handleCloseInfoPanel = () => {
    setSelectedActivity('');
    setInfoPanelOpen(false);
  }
  const handleDeleteActivity = () => {
    dispatch(deleteActivity(selectedActivity));
    setSelectedActivity('');
    toggleConfirmationDialog()
  }

  return (
    <Paper className={classes.container}>
      <ActivitiesToolbar
        onOpenEdit={handleOpenInfoPanel}
        toggleFilterPanel={toggleFilterPanel}
      />
      <div className={classes.contentContainer}>
        <div 
          className={classes.primaryContainer}
          style={{ width: isInfoPanelOpen ? '60%' : '100%' }}
        >
          <ActivityNestedList 
            activitiesList={activitiesList} 
            activityFilters={activityFilters}
            selectedActivity={selectedActivity}
            onOpenInfo={handleOpenInfoPanel}
          />
        </div>
        <ActivityInfo
          isOpen={isInfoPanelOpen}
          activityId={selectedActivity}
          activity={activities[selectedActivity]}
          onClose={handleCloseInfoPanel}
          onDeleteActivity={toggleConfirmationDialog}
        />
      </div>
      <SlidingPanel
        isOpen={isFiltersPanelOpen}
        onClose={toggleFilterPanel}
        direction="left"
        width={50}
      >
        <ActivityFilters
          activityFilters={activityFilters}
          onChangeFilter={handleChangeFilter}
        />
      </SlidingPanel>
      {isConfirmationOpen && (
        <ConfirmationDialog 
          isOpen 
          onClose={toggleConfirmationDialog}
          confirmationTitle={'Confirm To Delete Activity'}
          confirmationText={`Are you sure you want to delete ${selectedActivity.length && activities[selectedActivity].name}?`}
          secondaryIcon={<TrashIconXS />}
          primaryText="Cancel"
          secondaryText="Delete"
          onPrimaryAction={toggleConfirmationDialog}
          onSecondaryAction={handleDeleteActivity}
        />
      )}
    </Paper>
  )
}

export default ActivitiesContainer;