import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { getActivities } from 'activities/store/thunks';
// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { FilterListIconLarge } from '@core/components/Icons/ListIcon';
// Components
import { Typography } from '@material-ui/core';
import ActivitiesFilters from 'activities/mobile/components/ActivitiesFilters';
import ActivitiesFiltersChips from 'activities/mobile/components/ActivitiesFiltersChips';
import ActivitiesTypesList from 'activities/mobile/components/ActivitiesTypesList';
import ActivitiesList from 'activities/mobile/components/ActivitiesList';
import ActivityInfo from 'activities/mobile/components/ActivityInfo';
// Utils
import { checkStoreDataSyncInLocalStorage } from '@core/localstorage/lastUpdate';
import getEnumValues from '@core/utils/getEnumValues';
import getLeftOffset from '@core/utils/calculateLeftOffsetOfMobilePanel';
import defaultActivityFilters from 'activities/utils/defaultActivityFilters';
import areFiltersEmpty from 'activities/utils/areFiltersEmpty';
import getCurrentOpenPanelIndex from 'activities/utils/getCurrentOpenPanelIndex';
// Types
import { ActivityType } from 'activities/types';
import { OrganizerModule, RootState, AppDispatch } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '100%',
    width: '100%',
    background: '#fff',
    padding: '1.5em',
    position: 'relative',
    overflow: 'hidden'
  },
  header: {
    textAlign: 'center'
  },
  navRight: {
    position: 'absolute',
    right: '3em'
  },
  arrowIcon: {
    width: '4em', 
    height: '4em', 
    position: 'relative', 
    top: '2em', 
    color: '#3f51b5'
  },
  filtersDrawer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    display: 'flex',
    transition: 'right 300ms'
  },
  filtersContent: {
    height: '100%',
    width: '75%',
    background: '#ecedf0',
    padding: '10em 6em'
  },
  filtersExit: {
    height: '100%',
    width: '25%'
  },
  contentContainer: {
    width: '100%',
    height: '95%', 
    position: 'relative'
  },
  contentWindow: {
    width: '100%', 
    height: '100%', 
    position: 'absolute', 
    transition: 'left 300ms',
    padding: '1.5em'
  }
}));

const ActivitiesMobileContainer: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { loggedIn } = useSelector((store: RootState) => store.app.user);
  const { activities, lastUpdate } = useSelector((store: RootState) => store.activitiesStore);

  const [selectedActivityType, setSelectedActivityType] = React.useState<ActivityType | "Filter">(null);
  const [selectedActivity, setSelectedActivity] = React.useState('');
  const [activitiesFilters, setActivitiesFilters] = React.useState(defaultActivityFilters);
  const [filterMenuOpen, setFilterMenuOpen] = React.useState(false);

  const hasSelectedActivityType = Boolean(selectedActivityType);
  const hasSelectedActivity = Boolean(selectedActivity.length);
  const isTypeListView = !hasSelectedActivityType && !hasSelectedActivity;
  const isActivitiesListView = hasSelectedActivityType && !hasSelectedActivity;
  const isActivityView = hasSelectedActivity;

  const currentOpenPanel = getCurrentOpenPanelIndex(isTypeListView, isActivitiesListView, isActivityView);
  const activitiesTypesList = getEnumValues(ActivityType);

  React.useEffect(() => {
    const isDataUpToDate = checkStoreDataSyncInLocalStorage(OrganizerModule.Activities, lastUpdate);
    if (loggedIn && !isDataUpToDate) {
      dispatch(getActivities());
    }
  }, [loggedIn])
  
  const toggleFilterMenuOpen = () => {
    setFilterMenuOpen(!filterMenuOpen);
  }
  const handleSelectActivityType = (type?: ActivityType | "Filter") => {
    if (!type) {
      setSelectedActivityType(null);
    }
    else {
      setSelectedActivityType(type);
    }
  }
  const handleSelectActivity = (id?: string) => {
    if (!id) {
      setSelectedActivity('');
    }
    else {
      setSelectedActivity(id);
    }
  }
  const handleNavClick = () => {
    if (isTypeListView) {
      toggleFilterMenuOpen();
    } 
    else if (isActivitiesListView) {
      // If navigating back from a filtered view, reset filters
      if (selectedActivityType === "Filter") {
        setActivitiesFilters(defaultActivityFilters)
      }
      handleSelectActivityType();
    }
    else if (isActivityView) {
      handleSelectActivity();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeFilter = (property: string) => (eventOrValue: any) => {
    const value = eventOrValue.target?.value ?? eventOrValue;
    const newFilter = {
      ...activitiesFilters,
      [property]: value
    }
    setActivitiesFilters(newFilter);
    // If filters are cleared, revert to default view
    if (areFiltersEmpty(newFilter)) {
      // handleSelectActivityType()
    } 
    else if (selectedActivityType !== "Filter") {
      handleSelectActivityType("Filter");
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h1">
          Activities
        </Typography>
        <div 
          className={classes.navRight} 
          style={{ top: selectedActivityType ? '-1em' : '2em' }}
          onClick={handleNavClick}
        >
          {isActivitiesListView || isActivityView ? (
            <>
              <ChevronLeftIcon className={classes.arrowIcon} />
            </>
          ) : (
            <FilterListIconLarge />
          )}
        </div>
      </div>
      {selectedActivityType === "Filter" ? (
        <ActivitiesFiltersChips 
          activitiesFilters={activitiesFilters}
        />
      ) : null}
      <br/>
      <div className={classes.contentContainer}>
        <div 
          className={classes.contentWindow} 
          style={{ left: getLeftOffset(1, currentOpenPanel) }}
        >
          <ActivitiesTypesList
            activitiesTypesList={activitiesTypesList}
            onSelect={handleSelectActivityType}
          />
        </div>
        <div 
          className={classes.contentWindow} 
          style={{ left: getLeftOffset(2, currentOpenPanel) }}
        >
          <ActivitiesList
            activityType={selectedActivityType}
            activitiesFilters={activitiesFilters}
            onSelect={handleSelectActivity}
          />
        </div>
        <div 
          className={classes.contentWindow} 
          style={{ left: getLeftOffset(3, currentOpenPanel) }}
        >
          <ActivityInfo 
            activity={activities[selectedActivity]}
            activityId={selectedActivity}
          />
        </div>
      </div>
      <div 
        className={classes.filtersDrawer}
        style={{ right: filterMenuOpen ? '0%' : '-100%' }}
      >
        <div className={classes.filtersExit} onClick={toggleFilterMenuOpen} />
        <div className={classes.filtersContent}>
          <ActivitiesFilters 
            activitiesFilters={activitiesFilters}
            toggleFilterMenuOpen={toggleFilterMenuOpen}
            onChangeFilter={handleChangeFilter}
          />
        </div>
      </div>
    </div>
  )
}

export default ActivitiesMobileContainer;