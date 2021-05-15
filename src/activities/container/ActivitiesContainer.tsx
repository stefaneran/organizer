import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import ActivitiesToolbar from '@activities/components/ActivitiesToolbar';
import ActivityNestedList from '@activities/components/ActivityNestedList';
import EditActivity from '@activities/components/EditActivity';
import ActivityDetails from '@activities/components/ActivityDetails';
import { ConfirmationDialog } from '@core/components/ConfirmationDialog';
import activitiesToArray from '@activities/utils/activitiesToArray';
import defaultActivityProps from '@activities/utils/defaultActivityProps';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    marginTop: '1em',
    overflow: 'hidden'
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
  },
  secondaryContainer: {
    transition: 'width 300ms',
    height: '100%',
    overflowY: 'auto',
    paddingRight: '1em',
  },
}));

const ActivitiesContainer = ({ activities, addActivity, editActivity, deleteActivity }) => {
  const classes = useStyles();

  const [selectedActivity, setSelectedActivity] = React.useState("");
  const [textFilter, setTextFilter] = React.useState("");
  const [participantFilter, setParticipantFilter] = React.useState("All");
  const [editActivityMode, setEditActivityMode] = React.useState("");
  const [editActivityData, setEditActivityData] = React.useState(defaultActivityProps);
  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

  const hasSelectedActivity = Boolean(selectedActivity.length);

  const listItems = React.useMemo(() => 
    activitiesToArray(activities, textFilter, participantFilter), 
  [activities, textFilter, participantFilter]);

  const toggleConfirmationDialog = () => {
    setConfirmationOpen(!isConfirmationOpen);
  }
  const handleChangeTextFilter = (e) => {
    setTextFilter(e.target.value);
  }
  const handleChangeParticipantFilter = (e) => {
    setParticipantFilter(e.target.value);
  }
  const handleSelectActivity = (id) => () => {
    if (selectedActivity !== id) {
      if (editActivityMode.length) {
        setEditActivityMode('');
      }
      setSelectedActivity(id);
    } else {
      setSelectedActivity('');
    }
  }
  const handleOpenEditActivity = (mode) => () => {
    if (mode === 'new') {
      setEditActivityData(defaultActivityProps)
    } 
    // Map existing recipe's data to state hook
    else if (mode === 'edit') {
      const activity = { ...activities[selectedActivity] };
      setEditActivityData(activity);
    }
    setEditActivityMode(mode);
  }
  const handleSubmitEditActivity = () => {
    setEditActivityMode('');
    if (editActivityMode === 'new') {
      addActivity(editActivityData);
    } else if (editActivityMode === 'edit') {
      editActivity(selectedActivity, editActivityData);
    }
  }
  const handleDeleteActivity = () => {
    deleteActivity(selectedActivity);
    setSelectedActivity('');
    toggleConfirmationDialog()
  }

  return (
    <Paper className={classes.container}>
      <ActivitiesToolbar 
        textFilter={textFilter} 
        participantFilter={participantFilter}
        onChangeTextFilter={handleChangeTextFilter} 
        onChangeParticipantFilter={handleChangeParticipantFilter}
        onAddNew={handleOpenEditActivity}
      />
      <div className={classes.contentContainer}>
        <div 
          className={classes.primaryContainer}
          style={{ width: hasSelectedActivity || editActivityMode.length ? '60%' : '100%' }}
        >
          <ActivityNestedList 
            listItems={listItems} 
            textFilter={textFilter}
            participantFilter={participantFilter} 
            onSelectActivity={handleSelectActivity}
            selectedActivity={selectedActivity}
          />
        </div>
        <div 
          className={classes.secondaryContainer} 
          style={{ width: hasSelectedActivity || editActivityMode.length ? '40%' : '0%' }}
        >
          {editActivityMode.length ? (
            <EditActivity
              editActivityData={editActivityData}
              setEditActivityData={setEditActivityData}
              onSubmitEditActivity={handleSubmitEditActivity}
              onOpenEditActivity={handleOpenEditActivity}
            />
          ) : (
            <ActivityDetails 
              activity={activities[selectedActivity]}
              onSelectActivity={handleSelectActivity}
              onOpenEditActivity={handleOpenEditActivity}
              onDeleteActivity={toggleConfirmationDialog}
            />
          )}
        </div>
      </div>
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