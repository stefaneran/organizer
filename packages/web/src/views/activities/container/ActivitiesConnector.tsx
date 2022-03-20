import { connect, ConnectedProps } from 'react-redux';
import { getActivities, addActivity, editActivity, deleteActivity } from 'activities/store/thunks';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  loggedIn: state.app.user.loggedIn,
  activities: state.activitiesStore.activities
});

const mapDispatchToProps = {
  getActivities,
  addActivity,
  editActivity,
  deleteActivity 
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>