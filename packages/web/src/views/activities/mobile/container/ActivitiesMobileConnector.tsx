import { connect, ConnectedProps } from 'react-redux';
import { getActivities } from 'activities/store/thunks';
import { RootState } from '@core/types';

const mapStateToProps = (state: RootState) => ({
  loggedIn: state.app.user.loggedIn,
  activities: state.activitiesStore.activities,
  lastUpdate: state.activitiesStore.lastUpdate
});

const mapDispatchToProps = {
  getActivities
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>