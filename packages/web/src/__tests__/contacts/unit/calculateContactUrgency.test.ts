import calculateContactUrgency from 'contacts/utils/calculateContactUrgency';

const oneUnixDay = 60 * 60 * 24 * 1000;

const unitTests = [
  { 
    input: Date.now() - oneUnixDay, 
    output: { urgent: false, percent: 97, daysPassed: 1 }
  },
  { 
    input: Date.now() - (3 * oneUnixDay), 
    output: { urgent: false, percent: 90, daysPassed: 3 }
  },
  { 
    input: Date.now() - (15 * oneUnixDay), 
    output: { urgent: false, percent: 50, daysPassed: 15 }
  },
  { 
    input: Date.now() - (29 * oneUnixDay), 
    output: { urgent: false, percent: 4, daysPassed: 29 }
  },
  { 
    input: Date.now() - (30 * oneUnixDay), 
    output: { urgent: false, percent: 0, daysPassed: 30 }
  },
  { 
    input: Date.now() - (31 * oneUnixDay), 
    output: { urgent: true, percent: 3, daysPassed: 31 }
  },
  { 
    input: Date.now() - (45 * oneUnixDay), 
    output: { urgent: true, percent: 50, daysPassed: 45 }
  },
  { 
    input: Date.now() - (59 * oneUnixDay), 
    output: { urgent: true, percent: 96, daysPassed: 59 }
  },
  { 
    input: Date.now() - (60 * oneUnixDay), 
    output: { urgent: true, percent: 100, daysPassed: 60 }
  },
  { 
    input: Date.now() - (65 * oneUnixDay), 
    output: { urgent: true, percent: 100, daysPassed: 65 }
  },
  { 
    input: Date.now() - (187 * oneUnixDay), 
    output: { urgent: true, percent: 100, daysPassed: 187 }
  }
]

test('calculateContactUrgency', () => {
  for (const unitTest of unitTests) {
    const result = calculateContactUrgency(unitTest.input);
    expect(result).toEqual(unitTest.output);
  }
});