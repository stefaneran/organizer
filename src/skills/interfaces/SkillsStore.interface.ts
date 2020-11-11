import { Skill } from './Skill.interface';

interface SkillsStore {
  [id: string]: Skill;
}

export default SkillsStore;