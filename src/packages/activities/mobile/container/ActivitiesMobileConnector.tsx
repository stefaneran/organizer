import { connect, ConnectedProps } from 'react-redux';
import { addActivity, editActivity, deleteActivity } from 'activities/store/thunks';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  activities: state.activitiesStore.activities
});

const mapDispatchToProps = {
  addActivity,
  editActivity,
  deleteActivity 
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>