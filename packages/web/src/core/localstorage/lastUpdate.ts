import { OrganizerModule, ModuleStoreName } from '@core/types'

const moduleNameMap = {
  [OrganizerModule.Activities]: "lastActivityUpdate",
  [OrganizerModule.Contacts]: "lastContactUpdate",
  [OrganizerModule.Inventory]: "lastInventoryUpdate",
  [OrganizerModule.Recipes]: "lastRecipeUpdate"
}

// Check if this module's store data is present in local storage and if it's synced
export const checkStoreDataSyncInLocalStorage = (module: OrganizerModule, lastUpdateInStore: number): boolean => {
  const data = localStorage.getItem(ModuleStoreName[module]);
  if (data) {
    const lastUpdateInLocalStorage = getModuleLastUpdateFromLocalStorage(module)
    if (lastUpdateInLocalStorage < lastUpdateInStore) {
      return false;
    }
    return true;
  }
  return false;
}

export const initializeLocalStorageLastUpdate = (timestamp: number): void => {
  Object.entries(moduleNameMap).forEach(([, itemName]) => {
    localStorage.setItem(itemName, `${timestamp}`);
  })
}

export const getModuleLastUpdateFromLocalStorage = (moduleName: OrganizerModule): number => {
  const itemName = moduleNameMap[moduleName];
  return Number(localStorage.getItem(itemName));
}

export const setModuleLastUpdateInLocalStorage = (timestamp: number, moduleName: OrganizerModule): void => {
  const itemName = moduleNameMap[moduleName];
  localStorage.setItem(itemName, `${timestamp}`);
}