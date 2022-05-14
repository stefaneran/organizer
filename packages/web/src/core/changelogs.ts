
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
    `Improvement: Contacts - Added second last contact bar to list items to show both hangouts and general contact`
  ]
}