import * as React from 'react';
import { render } from '@testing-library/react';
import ActivitiesFilters from '@activities/components/ActivitiesFilters';
import defaultActivityFilters from '@activities/utils/defaultActivityFilters';

const setup = (onChange?) => {
  const emptyFunc = () => () => {};
  const mockProps = {
    activityFilters: defaultActivityFilters,
    onChangeFilter: onChange || emptyFunc
  }
  const { queryByTestId } = render(<ActivitiesFilters {...mockProps} />)
  const nameInput = queryByTestId("name-textfield");
  const participantsInput = queryByTestId("participants-select");
  return {
    nameInput,
    participantsInput
  }
}

describe('<ActivitiesFilters />', () => {

  it('renders properly', () => {
    const { nameInput, participantsInput } = setup();
    expect(nameInput).toBeTruthy();
    expect(participantsInput).toBeTruthy();
  });

  it('initializes with proper default values', () => {
    const { nameInput, participantsInput } = setup();
    expect(nameInput.value).toBe("");
    expect(participantsInput.value).toBe("All");
  });

  it('initializes onChange handlers', () => {
    const onChange = jest.fn();
    setup(onChange);
    expect(onChange.mock.calls.length).toBe(2);
    expect(onChange.mock.calls).toEqual([['name'],['participants']]);
  })

})
