export const TOTAL_HOURS_TO_MASTERY = 10000;
export const XP_PER_HOUR = 100;
export const SKILL_ITEM_XP_MODIFIER = 0.5;
export const TOTAL_XP_TO_MASTERY = TOTAL_HOURS_TO_MASTERY * XP_PER_HOUR;

export const XP_RANKS = [
  { min: 0, max: 1000, rank: 1, title: 'Poor', label: 'Poor (0 Hours)'}, 
  { min: 1001, max: 2000, rank: 2, title: 'Inept', label: 'Inept (10 Hours)' },
  { min: 2001, max: 3000, rank: 3, title: 'Newbie', label: 'Newbie (20 Hours)' },
  { min: 3001, max: 4000, rank: 4, title: 'Mediocre', label: 'Mediocre (30 Hours)' },
  { min: 4001, max: 5000, rank: 5, title: 'Unskilled', label: 'Unskilled (40 Hours)' },
  { min: 5001, max: 7000, rank: 6, title: 'Green', label: 'Green (50 Hours)' },
  { min: 7001, max: 9000, rank: 7, title: 'Beginner', label: 'Beginner (70 Hours)' },
  { min: 9001, max: 11000, rank: 8, title: 'Novice', label: 'Novice (90 Hours)' },
  { min: 11001, max: 13000, rank: 9, title: 'Amateur', label: 'Amateur (110 Hours)' },
  { min: 13001, max: 20000, rank: 10, title: 'Apprentice', label: 'Apprentice (130 Hours)' },
  { min: 20001, max: 25000, rank: 11, title: 'Initiated', label: 'Initiated (200 Hours)' },
  { min: 25001, max: 30000, rank: 12, title: 'Qualified', label: 'Qualified (250 Hours)' },
  { min: 30001, max: 40000, rank: 13, title: 'Trained', label: 'Trained (300 Hours)' },
  { min: 40001, max: 50000, rank: 14, title: 'Able', label: 'Able (400 Hours)' },
  { min: 50001, max: 60000, rank: 15, title: 'Competent', label: 'Competent (500 Hours)' },
  { min: 60001, max: 70000, rank: 16, title: 'Adept', label: 'Adept (600 Hours)' },
  { min: 70001, max: 80000, rank: 17, title: 'Capable', label: 'Capable (700 Hours)' },
  { min: 80001, max: 100000, rank: 18, title: 'Skilled', label: 'Skilled (800 Hours)' },
  { min: 100001, max: 120000, rank: 19, title: 'Experienced', label: 'Experienced (1000 Hours)' },
  { min: 120001, max: 140000, rank: 21, title: 'Good', label: 'Good (1200 Hours)' },
  { min: 140001, max: 160000, rank: 22, title: 'Great', label: 'Great (1400 Hours)' },
  { min: 160001, max: 180000, rank: 23, title: 'Inspiring', label: 'Inspiring (1600 Hours)' },
  { min: 180001, max: 200000, rank: 24, title: 'Impressive', label: 'Impressive (1800 Hours)' },
  { min: 200001, max: 300000, rank: 25, title: 'Advanced', label: 'Advanced (2000 Hours)' },
  { min: 300001, max: 400000, rank: 26, title: 'Professional', label: 'Professional (3000 Hours)' },
  { min: 400001, max: 500000, rank: 27, title: 'Remarkable', label: 'Remarkable (4000 Hours)' },
  { min: 500001, max: 600000, rank: 28, title: 'Expert', label: 'Expert (5000 Hours)' },
  { min: 600001, max: 700000, rank: 29, title: 'Specialist', label: 'Specialist (6000 Hours)' },
  { min: 700001, max: 800000, rank: 30, title: 'Elite', label: 'Elite (7000 Hours)' },
  { min: 800001, max: 900000, rank: 31, title: 'Champion', label: 'Champion (8000 Hours)' },
  { min: 900001, max: 999999999, rank: 32, title: 'Grand Master', label: 'Grand Master (9000 Hours)' }
];