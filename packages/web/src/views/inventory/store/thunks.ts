import { Dispatch } from 'redux';
import { v4 } from 'uuid';
// Actions
import {
  setInventoryData,
  setGroceryItem,
  deleteGroceryItemDone,
  addInventoryDone,
  removeInventoryDone,
  addCartDone,
  removeCartDone,
  updateCartSelectedDone,
  finishShoppingDone
} from '.';
import { updateAfterItemDelete } from 'recipes/store';
// Constants
import STATUS from '@core/constants/statusCodes';
// Utils
import genericRequestWithDispatch from '@core/utils/genericRequestWithDispatch';
import { saveModuleStoreDataToLocalStorage } from '@core/localstorage/store';
import { setModuleLastUpdateInLocalStorage } from '@core/localstorage/lastUpdate';
// Types
import { GetState, RequestOptions, OrganizerModule } from '@core/types';
import { GroceryItem, GroceryItemEdit } from 'inventory/types';

export const getItems = () => async (dispatch: Dispatch, getState: GetState) => {
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/inventory/get`,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not get groceries"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    setInventoryData,
    {},
  );
  saveModuleStoreDataToLocalStorage(getState, OrganizerModule.Inventory);
}

export const createItem = (groceryItem: GroceryItemEdit) => async (dispatch: Dispatch, getState: GetState) => {
  const groceryId = v4();
  const params = { groceryId, groceryItem };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/inventory/create`,
    params,
    acceptedStatusCode: STATUS.CREATED,
    errorMessage: "Could not create grocery item",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    setGroceryItem,
    params,
    OrganizerModule.Inventory
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Inventory);
  // TODO - Check if we even need to return this
  return groceryId;
}

export const updateItem = (groceryId: string, groceryItem: GroceryItem) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceryId, groceryItem };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/inventory/update`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not update grocery item",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    setGroceryItem,
    params,
    OrganizerModule.Inventory
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Inventory);
  return groceryId;
}

export const deleteItems = (groceriesIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceriesIds };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/inventory/delete`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not delete grocery item(s)",
    timestamp
  }
  const response = await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    deleteGroceryItemDone,
    params,
    OrganizerModule.Inventory
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Inventory);
  dispatch(updateAfterItemDelete({ ...response.data }))
}

export const addInventory = (groceriesIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceriesIds };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/inventory/addInventory`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not add to inventory",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    addInventoryDone,
    params,
    OrganizerModule.Inventory
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Inventory);
}

export const removeInventory = (groceriesIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceriesIds };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/inventory/removeInventory`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not remove from inventory",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    removeInventoryDone,
    params,
    OrganizerModule.Inventory
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Inventory);
}

export const addCart = (groceriesIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceriesIds };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/inventory/addCart`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not add to cart",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    addCartDone,
    params,
    OrganizerModule.Inventory
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Inventory);
}

export const removeCart = (groceriesIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceriesIds };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/inventory/removeCart`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not remove from cart",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    removeCartDone,
    params,
    OrganizerModule.Inventory
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Inventory);
}

export const updateCartSelected = (groceriesIds: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { groceriesIds };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/inventory/updateCartSelected`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not update cart selection",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateCartSelectedDone,
    params,
    OrganizerModule.Inventory
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Inventory);
}

export const finishShopping = () => async (dispatch: Dispatch, getState: GetState) => {
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/inventory/finishShopping`,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not finalize shopping",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    finishShoppingDone,
    {},
    OrganizerModule.Inventory
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Inventory);
}