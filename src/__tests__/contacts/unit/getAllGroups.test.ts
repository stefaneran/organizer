// @ts-nocheck
import getAllGroups from 'contacts/utils/getAllGroups';

const mockContacts1 = {
  '1': {
    groups: ['GroupA', 'GroupB']
  },
  '2': {
    groups: ['GroupB', 'GroupC']
  },
  '3': {
    groups: ['GroupA', 'GroupD']
  }
}

const mockContacts2 = {
  '1': {
    groups: []
  },
  '2': {
    groups: []
  },
  '3': {
    groups: ['GroupX']
  }
}

test('getAllGroups', () => {
  const result1 = getAllGroups(mockContacts1);
  const result2 = getAllGroups(mockContacts2);
  expect(result1).toEqual(['GroupA', 'GroupB', 'GroupC', 'GroupD']);
  expect(result2).toEqual(['GroupX']);
})