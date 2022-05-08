import { GetState, OrganizerModule, ModuleStoreName } from '@core/types'
import { setModuleLastUpdateInLocalStorage } from '@core/localstorage/lastUpdate';

export const saveModuleStoreDataToLocalStorage = (
  getState: GetState, 
  module: OrganizerModule
) => {
  const storeName = ModuleStoreName[module];
  const storeData = getState()[storeName];
  localStorage.setItem(storeName, JSON.stringify(storeData));
  setModuleLastUpdateInLocalStorage(storeData.lastUpdate, module);
}

export const loadStoreDataFromLocalStorage = () => {
  const storeNames = Object.entries(ModuleStoreName).map(([, name]) => name)
  const storeData = {};
  storeNames.forEach(name => {
    const data = localStorage.getItem(name);
    storeData[name] = JSON.parse(data);
  })
  return storeData;
}