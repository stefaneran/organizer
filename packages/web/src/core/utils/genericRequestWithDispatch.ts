import { Dispatch } from 'redux';
import { setLastActivityUpdate } from 'activities/store';
import { setLastContactUpdate } from 'contacts/store';
import { setLastInventoryUpdate } from 'inventory/store';
import { setLastRecipeUpdate } from 'recipes/store';
import { saveModuleStoreDataToLocalStorage } from '@core/localstorage/store';
import genericRequest from '@core/utils/genericRequest';
import { GetState, RequestOptions, OrganizerModule } from '@core/types';

// Which module's last update to set 
const moduleMap = {
  [OrganizerModule.Activities]: setLastActivityUpdate,
  [OrganizerModule.Contacts]: setLastContactUpdate,
  [OrganizerModule.Inventory]: setLastInventoryUpdate,
  [OrganizerModule.Recipes]: setLastRecipeUpdate
}

async function genericRequestWithDispatch(
  dispatch: Dispatch, 
  getState: GetState, 
  options: RequestOptions, 
  // eslint-disable-next-line @typescript-eslint/ban-types
  dispatchFunction: Function, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatchParams: any,
  // Which module needs to be cached and updated with timestamp
  module?: OrganizerModule
) {
  const response = await genericRequest(dispatch, getState, options);
  if (dispatchFunction) {
    const hasDispatchParams = Boolean(Object.keys(dispatchParams).length);
    dispatch(dispatchFunction(hasDispatchParams ? dispatchParams : response.data));
  }
  if (module) {
    const setLastUpdate = moduleMap[module];
    dispatch(setLastUpdate(Date.now()));
    saveModuleStoreDataToLocalStorage(getState, module);
  }
  return response;
}

export default genericRequestWithDispatch;