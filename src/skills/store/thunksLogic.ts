import formatHourValue from '@core/utils/formatHourValue';
import { getHoursFromPages } from '@skills/utils/general';
import { XP_PER_HOUR } from '@skills/constants';
import { SkillItemType } from '@skills/interfaces/SkillItem.interface';

export const updateSkillHoursLogic = (skill, hoursValue) => {
  const updatedSkill = { ...skill };
  const totalHours = skill.totalHours + hoursValue;
  const totalXP = skill.totalXP + (hoursValue * XP_PER_HOUR);

  const log = {
    categoryIdentifier: skill.title,
    unit: hoursValue,
    activityDate: Date.now(),
    title: `${skill.title}`,
    description: `Practiced ${formatHourValue(hoursValue)}`
  }

  updatedSkill.lastActivity = Date.now();
  updatedSkill.totalHours = totalHours;
  updatedSkill.totalXP = totalXP;
  updatedSkill.history.push(log);

  return updatedSkill;
}

export const updateSkillBookLogic = (skill, itemTitle, pagesValue) => {
  const updatedSkill = { ...skill }; 
  const book = updatedSkill.items.find(item => 
    item.itemType === SkillItemType.Book && 
    item.title === itemTitle
  );

  const pagesTotal = parseInt(book.pagesTotal, 10);
  const pagesRead = pagesValue -  parseInt(book.pagesRead, 10);
  const hoursRead = getHoursFromPages(pagesRead);
  const totalItemXP = parseInt(book.totalXP, 10);

  let finished = false;
  if(pagesTotal === pagesValue) {
    finished = true;
  }
  
  const log = {
    categoryIdentifier: skill.title,
    subType: SkillItemType.Book,
    unit: hoursRead,
    activityDate: Date.now(),
    title: `${skill.title} Book: ${itemTitle}`,
    description: finished ? 'Finished the book!' : `Read ${pagesRead} pages`
  }

  // Update total pages read
  book.pagesRead = pagesValue;
  book.lastActivity = Date.now();
  // Add hours and XP to skill 
  updatedSkill.totalHours += hoursRead;
  updatedSkill.totalXP += hoursRead * XP_PER_HOUR;
  updatedSkill.lastActivity = Date.now();
  updatedSkill.history.push(log);
  // If user finished the book
  if(finished) {
    // Update date finished
    book.dateFinished = Date.now();
    // Copy
    const bookCopy = { ...book };
    // Add the bonus XP to the skill
    updatedSkill.totalXP += totalItemXP;
    // Add item to skill archive
    updatedSkill.archive.push(bookCopy);
    // Remove item from current list
    updatedSkill.items = updatedSkill.items.filter(item => item.title !== itemTitle);
  }

  return updatedSkill;
}

export const updateSkillCourseLogic = (skill, itemTitle, classesValue) => {

  const updatedSkill = { ...skill }; 
  const course = updatedSkill.items.find(item => 
    item.itemType === SkillItemType.Course && 
    item.title === itemTitle
  );

  const classesTotal = parseInt(course.classesTotal, 10);
  const classesDone = classesValue -  parseInt(course.classesDone, 10);
  const hoursPracticed = classesDone * parseInt(course.hoursPerClass, 10);
  const totalItemXP = parseInt(course.totalXP, 10);

  let finished = false;
  if(classesTotal === classesValue) {
    finished = true;
  }

  const log = {
    categoryIdentifier: skill.title,
    subType: SkillItemType.Course,
    unit: hoursPracticed,
    activityDate: Date.now(),
    title: `${skill.title} Course: ${itemTitle}`,
    description: finished ? 'Finished the course!' : `Done ${classesDone} classes`
  }

  // Update total pages read
  course.classesDone = classesValue;
  course.lastActivity = Date.now();
  // Add hours and XP to skill 
  updatedSkill.totalHours += hoursPracticed;
  updatedSkill.totalXP += hoursPracticed * XP_PER_HOUR;
  updatedSkill.lastActivity = Date.now();
  updatedSkill.history.push(log);
  // If user finished the book
  if(finished) {
    // Update date finished
    course.dateFinished = Date.now();
    // Copy
    const item = { ...course };
    // Add the bonus XP to the skill
    updatedSkill.totalXP += totalItemXP;
    // Add item to skill archive
    updatedSkill.archive.push(item);
    // Remove item from current list
    updatedSkill.items = updatedSkill.items.filter(item => item.title !== itemTitle);
  }

  return updatedSkill;
}