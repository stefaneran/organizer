import { Dispatch } from 'redux';
import {
  loginDone,
  logoutDone
} from './reducer';
import { 
  setActivities, 
  setLastActivityUpdate, 
  clearActivities 
} from 'activities/store';
import { 
  setLastContactUpdate, 
  clearContactsAndEvents, 
  setContactsAndEvents 
} from 'contacts/store';
import { 
  setLastInventoryUpdate, 
  clearInventoryData,
  setInventoryData
} from 'inventory/store';
import { 
  setLastRecipeUpdate, 
  clearRecipes,
  setRecipes
} from 'recipes/store';
// Utils
import jsonFetch from '@core/utils/jsonFetch';
import { saveUserToLocalStorage } from '@core/localstorage/user';
import { loadStoreDataFromLocalStorage } from '@core/localstorage/store';
import { initializeLocalStorageLastUpdate } from '@core/localstorage/lastUpdate';
// Types
import { ModuleStoreName } from '@core/types';
// Constants
import baseUrl from '@core/baseUrl';
import STATUS from '@core/constants/statusCodes';

export const register = ({ userName, password }) => async (dispatch: Dispatch) => {
  const params = { userName, password }
  try {
    const timestamp = Date.now();
    const response = await jsonFetch({
      url: `${baseUrl}/app/register`,
      method: 'POST',
      body: JSON.stringify(params),
      timestamp
    })
    if (response.status === STATUS.CREATED) {
      saveUserToLocalStorage(userName, password);
      initializeLocalStorageLastUpdate(timestamp);
      dispatch(loginDone({ userName, password }));
    }
  } catch (e) {
    return;
  }
}

export const login = ({ userName, password }) => async (dispatch: Dispatch) => {
  const params = { userName, password }
  try {
    const response = await jsonFetch({
      url: `${baseUrl}/app/login`,
      method: 'POST',
      body: JSON.stringify(params)
    })
    if (response.status === STATUS.OK) {
      
      saveUserToLocalStorage(userName, password);
      
      // Set lastUpdate values based on database latest values (will be compared to localStorage values in module containers to determine synchronisity)

      const { 
        lastActivityUpdate,
        lastContactUpdate,
        lastInventoryUpdate,
        lastRecipeUpdate,
      } = response.data;

      dispatch(setLastActivityUpdate(lastActivityUpdate));
      dispatch(setLastContactUpdate(lastContactUpdate));
      dispatch(setLastInventoryUpdate(lastInventoryUpdate));
      dispatch(setLastRecipeUpdate(lastRecipeUpdate));

      // Load data from localstorage

      const storeData = loadStoreDataFromLocalStorage();

      if (storeData[ModuleStoreName.Activities]) {
        const { activities } = storeData[ModuleStoreName.Activities];
        dispatch(setActivities(activities));
      }
      if (storeData[ModuleStoreName.Contacts]) {
        dispatch(setContactsAndEvents(storeData[ModuleStoreName.Contacts]))
      }
      if (storeData[ModuleStoreName.Inventory]) {
        dispatch(setInventoryData(storeData[ModuleStoreName.Inventory]))
      }
      if (storeData[ModuleStoreName.Recipes]) {
        const { recipes } = storeData[ModuleStoreName.Recipes];
        dispatch(setRecipes(recipes))
      }

      dispatch(loginDone({ userName, password }))

    }
  } catch (e) {
    localStorage.clear();
  }
}

export const logout = () => async (dispatch: Dispatch) => {
  // Clear localStorage
  localStorage.clear();

  // Clear Redux store
  dispatch(clearActivities());
  dispatch(clearContactsAndEvents());
  dispatch(clearInventoryData());
  dispatch(clearRecipes());

  dispatch(logoutDone());
}