import * as React from 'react';
import { AnyAction } from "redux";
import { ThunkDispatch } from 'redux-thunk';
import { Activity } from 'activities/types';
import { Contact, Event } from 'contacts/types';
import { GroceryItemEdit } from 'inventory/types';
import { Recipe } from 'recipes/types';
import combinedReducer from 'app/store/combinedReducer';

// ********** General types ********** //

export type Option = { 
  label: string; 
  value: string; 
};

export type UnitType = 'units' | 'grams' | 'milliliters' | 'teaspoons' | 'tablespoons';

// React.useState setter function
export type StateSetter<T> = 
  React.Dispatch<React.SetStateAction<T>>;

export type RequestOptions = {
  url: string;
  params?: any;
  acceptedStatusCode: number;
  errorMessage: string;
  timestamp?: number;
}

export type UserData = {
  userName: string;
  password: string;
}

// ********** Event types ********** //

// MUI <TextField /> or <Switch /> onChange event
export type InputEvent = 
  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export type KeyboardEvent = 
  React.KeyboardEvent<HTMLDivElement>;

export type ClickEvent = 
  React.MouseEvent<HTMLButtonElement, MouseEvent> | 
  React.MouseEvent<HTMLDivElement, MouseEvent>;

// MUI <Select /> onChange event
export type SelectEvent<T> = React.ChangeEvent<{ 
  name?: string | undefined;
  value: T;
}>

// MUI <Autocomplete /> onChange event
export type AutoCompleteHandler = 
  (event: React.ChangeEvent<any>, value: any | null) => void // eslint-disable-line @typescript-eslint/no-explicit-any

// Which package/module is open in the app
export enum OrganizerModule {
  Activities = "Activities",
  Contacts = "Contacts",
  Inventory = "Inventory",
  Recipes = "Recipes"
}

export enum ModuleStoreName {
  Activities = "activitiesStore",
  Contacts = "contactsStore",
  Inventory = "inventoryStore",
  Recipes = "recipesStore"
}

// ********** Redux types ********** //

export interface ActivitiesStore {
  activities: Record<string, Activity>;
  lastUpdate: number;
}

export interface ContactsStore {
  contacts: Record<string, Contact>;
  events: Record<string, Event>;
  groups: string[];
  lastUpdate: number;
}

export interface InventoryStore {
  groceries: Record<string, GroceryItemEdit>;
  inventory: string[];
  cart: string[];
  cartSelected: string[];
  lastUpdate: number;
}

export interface RecipeStore {
  recipes: Record<string, Recipe>;
  lastUpdate: number;
}

export type RootState = ReturnType<typeof combinedReducer>;

export type GetState = () => RootState;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>; 

