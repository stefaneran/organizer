import { Contact, Genders } from 'contacts/types';

const oneUnixDay = 60 * 60 * 24 * 1000;

const daysAgo = (days) => Date.now() - (days * oneUnixDay);

const mockContacts: Record<string, Contact> = {
  '1': {
    name: 'John Doe',
    location: 'Sofia, Bulgaria',
    groups: ['Work'],
    gender: Genders.Male,
    oneOnOne: true,
    lastContact: daysAgo(3),
    lastHangout: daysAgo(8),
    hangoutTally: 6,
    dateCreated: daysAgo(85)
  },
  '2': {
    name: 'Jane Doe',
    location: 'Sofia, Bulgaria',
    groups: [],
    gender: Genders.Female,
    oneOnOne: false,
    lastContact: daysAgo(8),
    lastHangout: daysAgo(8),
    hangoutTally: 2,
    dateCreated: daysAgo(65)
  },
  '3': {
    name: 'Jack Robert',
    location: 'Sofia, Bulgaria',
    groups: ['Work'],
    gender: Genders.Male,
    oneOnOne: true,
    lastContact: daysAgo(4),
    lastHangout: daysAgo(12),
    hangoutTally: 5,
    dateCreated: daysAgo(80)
  },
  '4': {
    name: 'Julio Sanchez',
    location: 'Mexico City, Mexico',
    groups: ['Digital Nomading'],
    gender: Genders.Male,
    oneOnOne: true,
    lastContact: daysAgo(41),
    lastHangout: daysAgo(89),
    hangoutTally: 2,
    dateCreated: daysAgo(97)
  },
  '5': {
    name: 'Boris Danchev',
    location: 'Sofia, Bulgaria',
    groups: ['Foreigners Group'],
    gender: Genders.Male,
    oneOnOne: true,
    lastContact: daysAgo(15),
    lastHangout: daysAgo(15),
    hangoutTally: 12,
    dateCreated: daysAgo(120)
  },
  '6': {
    name: 'Yana Dancheva',
    location: 'Sofia, Bulgaria',
    groups: ['Foreigners Group'],
    gender: Genders.Female,
    oneOnOne: false,
    lastContact: daysAgo(15),
    lastHangout: daysAgo(15),
    hangoutTally: 12,
    dateCreated: daysAgo(118)
  },
}

export default mockContacts;