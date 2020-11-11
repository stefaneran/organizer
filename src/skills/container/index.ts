import { connect } from 'react-redux';
import {
  createSkill,
  createSkillItem,
  deleteSkill,
  editSkill,
  updateSkillHours,
  updateSkillBook,
  updateSkillCourse
} from '@skills/store/thunks';
import SkillsContainer from './SkillsContainer';

const mapStateToProps = state => ({
  skills: state.skillsStore.skills
});

const mapDispatchToProps = {
  createSkill,
  createSkillItem,
  deleteSkill,
  editSkill,
  updateSkillHours,
  updateSkillBook,
  updateSkillCourse
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillsContainer);