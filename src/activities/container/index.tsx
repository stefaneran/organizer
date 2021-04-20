import { connect } from 'react-redux';
import ActivitiesContainer from './ActivitiesContainer';
import { addActivity, editActivity, deleteActivity } from '@activities/store/thunks';

const mapStateToProps = state => ({
  activities: state.activitiesStore.activities
});

const mapDispatchToProps = {
  addActivity,
  editActivity,
  deleteActivity
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivitiesContainer);