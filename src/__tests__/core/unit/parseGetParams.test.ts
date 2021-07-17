import parseGetParams from '@core/utils/parseGetParams';

const unitTests = [
  {
    input: 'https://google.com/?demo=1',
    output: { demo: '1' }
  },
  {
    input: 'https://google.com/?demo=1&new=0',
    output: { demo: '1', new: '0' }
  },
  {
    input: 'https://google.com/?demo=1&new=0&test=3',
    output: { demo: '1', new: '0', test: '3' }
  },
  {
    input: 'https://google.com/demo=1',
    output: {}
  },
  {
    input: 'https://google.com/demo=1&new=0&test=3',
    output: {}
  },
  {
    input: 'https://google.com/?demo=1new=0',
    output: {}
  },
  {
    input: 'https://google.com',
    output: {}
  }
]

test('parseGetParams', () => {
  for (const unitTest of unitTests) {
    const result = parseGetParams(unitTest.input);
    expect(result).toEqual(unitTest.output);
  }
})