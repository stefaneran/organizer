
export const getLatestVersion = () => {
  const versions = Object.keys(changelogs);
  return versions[versions.length - 1];
}

export const changelogs = {
  "1.0.0": [
    `Initial deploy with 4 modules: Contacts, Activities, Inventory, and Recipes. Actual changelog dialog yet to be added.`
  ],
  "1.0.1": [
    `Refactor: All modules now use redux hooks (useSelector, useDispatch) instead of connectors (mapStateToProps, mapDispatchToProps)`,
    `Feature: Groceries - Can mark items as essential, have button to add all missing essentials`,
    `UX Improvement: Groceries - Name input cleared when adding new item`,
    `Improvement: Contacts - Added second last contact bar to list items to show both hangouts and general contact`,
  ],
  "1.0.2": [
    `Improvement: Contacts - Moved hangout logic to frontend, refreshes on every events update`,
    `Improvement: Contacts - Improved the way events show title/times`,
    `Refactor: Contacts - Hid past events (useless feature)`
  ],
  "1.0.3": [
    `Bugfix: Now showing loading icon when logging in`,
    `Bugfix: Recipes - Fix alternative ingredient in cart still displaying recipe availability as red instead of yellow`,
    `Improvement: Contacts - Can now set hangout frequency in days and sort by last hangout (factoring in frequency)`
  ]
}