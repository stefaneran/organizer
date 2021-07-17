import * as React from 'react';
import { render, within } from '@testing-library/react';
import ActivityListItem from 'activities/components/ActivityListItem';
import { ActivityType } from 'activities/types';
import mockActivities from '@core/mocks/mockActivities';

const setup = (onOpenInfo?) => {
  const mockProps = {
    activity: mockActivities['1'],
    isSelected: false,
    // TODO test function
    onOpenInfo
  }
  const { queryByTestId } = render(<ActivityListItem {...mockProps} />)
  const listItem = queryByTestId("activity-list-item-1");
  return listItem;
}

describe('<ActivityListItem />', () => {

  it('renders properly', () => {
    const listItem = setup();
    expect(listItem).toBeTruthy();
  });

  it('shows title', () => {
    const listItem = setup();
    const title = within(listItem).getByText('Bar');
    expect(title).toBeTruthy();
  })

  it('shows subtitle', () => {
    const listItem = setup();
    const subtitle = within(listItem).getByText(ActivityType.Drinks);
    expect(subtitle).toBeTruthy();
  })

})