
/* 
  Skill

  title: string;
  description: string;
  categoryType: CategoryType;
  priority: PriorityType;
  activity: ActivityType;
  items: any[]; 
  archive: any[];
  totalHours: number;
  totalXP: number;
*/

/* 
  Item

  title: string;
  totalXP: number;
  dateCreated: number;
  lastActivity: number;

  Book:

  author?: string;
  pagesTotal: number;
  pagesRead: number;
  history: IBookHistoryLog[];
*/

export default {
  title: "Music Mixing",
  description: "How to mix music like a master",
  categoryType: "Skill",
  priority: "High",
  activity: "Active",
  totalHours: 328,
  totalXP: 4500,
  lastActivity: 1586679190,
  items: [
    {
      itemType: 'Book',
      title: 'Mixing Audio',
      author: 'Roey Izhaki',
      totalXP: 1000,
      pagesTotal: 300,
      pagesRead: 125,
      dateCreated: 1586639190,
      lastActivity: 1586679190,
      history: []
    }
  ],
  archive: []
}