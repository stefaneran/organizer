import getLinkString from 'activities/utils/getLinkString';

const unitTests = [
  {
    input: 'https://www.google.com',
    output: 'google.com'
  },
  {
    input: 'http://www.google.com',
    output: 'google.com'
  },
  {
    input: 'https://google.com',
    output: 'google.com'
  },
  {
    input: 'http://google.com',
    output: 'google.com'
  },
  {
    input: 'google.com',
    output: 'google.com'
  }
]

test('getLinkString', () => {
  for (const unitTest of unitTests) {
    const result = getLinkString(unitTest.input);
    expect(result).toBe(unitTest.output)
  }
});