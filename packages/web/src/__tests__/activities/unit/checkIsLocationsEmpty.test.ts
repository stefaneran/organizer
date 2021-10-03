import checkIsLocationsEmpty from 'activities/utils/checkIsLocationsEmpty';

describe('checkIsLocationsEmpty', () => {

  it('handles empty set', () => {
    const input = [];
    const result = checkIsLocationsEmpty(input);
    const expectedOutput = true;
    expect(result).toBe(expectedOutput);
  })

  it('handles non-empty set with empty values', () => {
    const input = [{ name: '', address: '' }];
    const result = checkIsLocationsEmpty(input);
    const expectedOutput = true;
    expect(result).toBe(expectedOutput);
  })

  it('handles non-empty set with only name value', () => {
    const input = [{ name: 'Test', address: '' }];
    const result = checkIsLocationsEmpty(input);
    const expectedOutput = false;
    expect(result).toBe(expectedOutput);
  })

  it('handles non-empty set with only address value', () => {
    const input = [{ name: '', address: 'Test' }];
    const result = checkIsLocationsEmpty(input);
    const expectedOutput = false;
    expect(result).toBe(expectedOutput);
  })

  it('handles non-empty set with both name and address', () => {
    const input = [{ name: 'Test', address: 'Test' }];
    const result = checkIsLocationsEmpty(input);
    const expectedOutput = false;
    expect(result).toBe(expectedOutput);
  })

  it('handles non-empty set with one empty object and one non-empty object', () => {
    const input = [{ name: '', address: '' }, { name: 'Test', address: '' }];
    const result = checkIsLocationsEmpty(input);
    const expectedOutput = false;
    expect(result).toBe(expectedOutput);
  })

})