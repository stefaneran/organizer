import getContactsArray from 'contacts/utils/getContactsArray';
import defaultContactFilters from 'contacts/utils/defaultContactFilters';
import { RelationshipStatus, Genders, SortOption } from 'contacts/types';
import mockContacts from 'core/mocks/mockContacts';

const mockFilters = [
  { ...defaultContactFilters, gender: Genders.Female },
  { ...defaultContactFilters, relationshipStatus: RelationshipStatus.Single },
  { ...defaultContactFilters, location: 'sof' },
  { ...defaultContactFilters, name: 'doe' },
  { ...defaultContactFilters, group: 'Work' },
  { ...defaultContactFilters, oneOnOne: true },
  { ...defaultContactFilters, sort: SortOption.Location },
  { ...defaultContactFilters, sort: SortOption.LastContact },
]

const unitTests = [
  // Default filter
  { 
    input: defaultContactFilters,
    output: { 
      length: 6, 
      names: ["Boris Danchev", "Jack Robert", "Jane Doe", "John Doe", "Julio Sanchez", "Yana Dancheva"] 
    }
  },
  // By gender ("Female")
  { 
    input: mockFilters[0],
    output: { 
      length: 2, 
      names: ["Jane Doe", "Yana Dancheva"] 
    }
  },
  // By Relationaship status ("Single")
  { 
    input: mockFilters[1],
    output: { 
      length: 2, 
      names: ["Jack Robert", "Yana Dancheva"] 
    }
  },
  // By location ("sof")
  { 
    input: mockFilters[2],
    output: { 
      length: 5, 
      names: ["Boris Danchev", "Jack Robert", "Jane Doe", "John Doe", "Yana Dancheva"] 
    }
  },
  // By name ("doe")
  { 
    input: mockFilters[3],
    output: { 
      length: 2, 
      names: ["Jane Doe", "John Doe"] 
    }
  },
  // By group ("Work")
  { 
    input: mockFilters[4],
    output: { 
      length: 2, 
      names: ["Jack Robert", "John Doe"] 
    }
  },
  // One-on-one only
  { 
    input: mockFilters[5],
    output: { 
      length: 4, 
      names: ["Boris Danchev", "Jack Robert", "John Doe", "Julio Sanchez"] 
    }
  },
  // Sort by Location
  { 
    input: mockFilters[6],
    output: { 
      length: 6, 
      names: ["Julio Sanchez", "John Doe", "Jane Doe", "Jack Robert", "Boris Danchev", "Yana Dancheva"] 
    }
  },
  // Sort by Last Contact
  { 
    input: mockFilters[7],
    output: { 
      length: 6, 
      names: ["Julio Sanchez", "Boris Danchev", "Yana Dancheva", "Jane Doe", "Jack Robert", "John Doe"] 
    }
  },
]

test('getContactsArray', () => {
  for (const unitTest of unitTests) {
    const filters = unitTest.input;
    const result = getContactsArray(mockContacts, filters);
    const resultNames = result.map(contact => contact.name);
    expect(result.length).toBe(unitTest.output.length)
    expect(resultNames).toEqual(unitTest.output.names)
  }
})