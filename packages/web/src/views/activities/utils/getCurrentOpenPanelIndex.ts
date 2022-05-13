const getCurrentOpenPanelIndex = (
  isTypeListView, 
  isActivitiesListView, 
  isActivityView 
) => {
  if (isTypeListView) 
    return 1;
  else if (isActivitiesListView)
    return 2;
  else if (isActivityView)
    return 3
}

export default getCurrentOpenPanelIndex;