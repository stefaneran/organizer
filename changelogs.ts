
export const getLatestVersion = () => {
  const versions = Object.keys(changelogs);
  return versions[versions.length - 1];
}

export const changelogs = {
  "1.0.0": [
    `Initial deploy with 4 modules: Contacts, Activities, Inventory, and Recipes. Actual changelog dialog yet to be added.`
  ]
}