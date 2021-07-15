import getShortName from '@contacts/utils/getShortName';

const unitTests = [
  {
    input: 'Stefan Milenkovic',
    output: 'Stefan M.'
  },
  {
    input: 'Stefan',
    output: 'Stefan'
  },
  {
    input: 'Stefan M.',
    output: 'Stefan M.'
  },
  {
    input: 'Stefan Eran Milenkovic',
    output: 'Stefan M.'
  },
  {
    input: 'Stefan Eran Hector Himenez Santiago Sanchez Milenkovic',
    output: 'Stefan M.'
  },
  {
    input: 's',
    output: 's'
  },
  {
    input: '',
    output: ''
  },
  {
    input: undefined,
    output: ''
  }
]

test('getShortName', () => {
  for (const unitTest of unitTests) {
    const result = getShortName(unitTest.input);
    expect(result).toEqual(unitTest.output);
  }
})