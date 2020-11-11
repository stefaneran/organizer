import formatHourValue from '@core/utils/formatHourValue';
import { getHoursFromPages } from '@skills/utils/general';
import { XP_PER_HOUR } from '@skills/constants';
import { SkillItemType } from '@skills/interfaces/SkillItem.interface';

export const updateSkillHoursLogic = (skill, hoursValue) => {
  const updatedSkill = { ...skill };
  const totalHours = skill.totalHours + hoursValue;
  const totalXP = skill.totalXP + (hoursValue * XP_PER_HOUR);
  
  const log = {
    identifier: skill.id,
    unit: hoursValue,
    activityDate: Date.now(),
    title: `${skill.name}`,
    description: `Practiced ${formatHourValue(hoursValue)}`
  }
  
  updatedSkill.lastActivity = Date.now();
  updatedSkill.totalHours = totalHours;
  updatedSkill.totalXP = totalXP;
  updatedSkill.history = [...updatedSkill.history, log];

  return updatedSkill;
}

export const updateSkillBookLogic = (skill, itemName, pagesValue) => {
  
  const updatedSkill = { ...skill }; 

  const book = updatedSkill.items.find(item => 
    item.itemType === SkillItemType.Book && 
    item.name === itemName
  );
  const updatedBook = { ...book };
  
  const pagesTotal = parseInt(book.pagesTotal, 10);
  const pagesRead = pagesValue -  parseInt(book.pagesRead, 10);
  const hoursRead = getHoursFromPages(pagesRead);
  const totalItemXP = parseInt(book.totalXP, 10);
  
  let finished = false;
  if(pagesTotal === pagesValue) {
    finished = true;
  }
  
  const log = {
    identifier: skill.title,
    subType: SkillItemType.Book,
    unit: hoursRead,
    activityDate: Date.now(),
    title: `${skill.name} Book: ${itemName}`,
    description: finished ? 'Finished the book!' : `Read ${pagesRead} pages`
  }
  
  // Update total pages read
  updatedBook.pagesRead = pagesValue;
  updatedBook.lastActivity = Date.now();

  // Add hours and XP to skill 
  updatedSkill.totalHours = updatedSkill.totalHours + hoursRead;
  updatedSkill.totalXP = updatedSkill.totalXP + (hoursRead * XP_PER_HOUR);
  updatedSkill.lastActivity = Date.now();
  updatedSkill.history = [...updatedSkill.history, log];

  // If user finished the book
  if(finished) {
    // Update date finished
    updatedBook.dateFinished = Date.now();
    // Add the bonus XP to the skill
    updatedSkill.totalXP = updatedSkill.totalXP + totalItemXP;
    // Add item to skill archive
    updatedSkill.archive = [...updatedSkill.archive, updatedBook];
    // Remove item from current list
    updatedSkill.items = updatedSkill.items.filter(item => item.name !== itemName);

    return updatedSkill;
  }

  // Replace the outdated book with the updated book
  updatedSkill.items = [...updatedSkill.items.filter(item => item.name !== itemName), updatedBook];

  return updatedSkill;
}

export const updateSkillCourseLogic = (skill, itemName, classesValue) => {

  const updatedSkill = { ...skill }; 

  const course = updatedSkill.items.find(item => 
    item.itemType === SkillItemType.Course && 
    item.name === itemName
  );
  const updatedCourse = { ...course };

  const classesTotal = parseInt(course.classesTotal, 10);
  const classesDone = classesValue -  parseInt(course.classesDone, 10);
  const hoursPracticed = classesDone * parseInt(course.hoursPerClass, 10);
  const totalItemXP = parseInt(course.totalXP, 10);

  let finished = false;
  if(classesTotal === classesValue) {
    finished = true;
  }

  const log = {
    identifier: skill.name,
    subType: SkillItemType.Course,
    unit: hoursPracticed,
    activityDate: Date.now(),
    title: `${skill.name} Course: ${itemName}`,
    description: finished ? 'Finished the course!' : `Done ${classesDone} classes`
  }

  // Update total pages read
  updatedCourse.classesDone = classesValue;
  updatedCourse.lastActivity = Date.now();

  // Add hours and XP to skill 
  updatedSkill.totalHours = updatedSkill.totalHours + hoursPracticed;
  updatedSkill.totalXP = updatedSkill.totalXP + (hoursPracticed * XP_PER_HOUR);
  updatedSkill.lastActivity = Date.now();
  updatedSkill.history = [...updatedSkill.history, log];

  // If user finished the course
  if(finished) {
    // Update date finished
    updatedCourse.dateFinished = Date.now();
    // Add the bonus XP to the skill
    updatedSkill.totalXP = updatedSkill.totalXP + totalItemXP;
    // Add item to skill archive
    updatedSkill.archive = [...updatedSkill.archive, updatedCourse];
    // Remove item from current list
    updatedSkill.items = updatedSkill.items.filter(item => item.name !== itemName);

    return updatedSkill;
  }

  // Replace the outdated course with the updated course
  updatedSkill.items = [...updatedSkill.items.filter(item => item.name !== itemName), updatedCourse];

  return updatedSkill;
}