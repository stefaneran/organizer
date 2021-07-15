import * as React from 'react';
import { render, within } from '@testing-library/react';
import ActivityLocations from '@activities/components/ActivityLocations';
import { ActivityType } from '@activities/types';
import mockActivities from '@core/mocks/mockActivities';

const setup = () => {
  const mockProps = {
    locations: mockActivities['1'].locations
  }
  const { queryByTestId } = render(<ActivityLocations {...mockProps} />)
  const locationsList = queryByTestId("activity-location-list");
  return locationsList;
}

describe('<ActivityLocations />', () => {

  it('renders properly', () => {
    const locationsList = setup();
    expect(locationsList).toBeTruthy();
  });

  it('shows list with 3 items', () => {
    const locationsList = setup();
    const items = within(locationsList).getAllByTestId("activity-location-item")
    expect(items).toBeTruthy();
    expect(items.length).toBe(3);
  })

  it('first item has proper title', () => {
    const locationsList = setup();
    const items = within(locationsList).getAllByTestId("activity-location-item")
    const item = within(items[0]).getByText("The Jive");
    expect(item).toBeTruthy();
  })

})