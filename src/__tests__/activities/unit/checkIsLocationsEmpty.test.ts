import checkIsLocationsEmpty from '@activities/utils/checkIsLocationsEmpty';

const unitTests = [
  {
    input: [],
    output: true
  },
  {
    input: [{ name: '', address: '' }],
    output: true
  },
  {
    input: [{ name: 'Test', address: '' }],
    output: false
  },
  {
    input: [{ name: '', address: 'Test' }],
    output: false
  },
  {
    input: [{ name: 'Test', address: 'Test' }],
    output: false
  },
  {
    input: [{ name: '', address: '' }, { name: 'Test', address: '' }],
    output: false
  }
]

test('checkIsLocationsEmpty', () => {
  for (const unitTest of unitTests) {
    const result = checkIsLocationsEmpty(unitTest.input);
    expect(result).toBe(unitTest.output);
  }
})