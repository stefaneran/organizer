import * as React from 'react';
import { Activity } from 'activities/types';
import { Contact, Event } from 'contacts/types';
import { InventoryItem } from 'inventory/types';
import { Recipe } from 'recipes/types';

export type Option = { label: string; value: string; };

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type InputEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
export type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>;
export type KeyboardEvent = React.KeyboardEvent<HTMLDivElement>;
export type SelectEvent<T> = React.ChangeEvent<{ 
  name?: string | undefined;
  value: T;
}>
export type AutoCompleteHandler = (event: React.ChangeEvent<any>, value: any | null) => void

export enum CategoryType {
  Activities = "Activities",
  Contacts = "Contacts",
  Inventory = "Inventory",
  Recipes = "Recipes"
}

// Redux -------------------------------------------------- //

export interface ActivitiesStore {
  activities: Record<string, Activity>;
}

export interface ContactsStore {
  contacts: Record<string, Contact>;
  events: Record<string, Event>;
  groups: string[];
}

export interface InventoryStore {
  allItems: Record<string, InventoryItem>,
  availableItems: string[],
  cart: string[],
  selectedInCart: string[]
}

export interface RecipeStore {
  recipes: Record<string, Recipe>
}

export interface AppStore {
  app: {
    version: string;
    loading: boolean;
    isMobile: boolean;
    user: {
      userName: string;
      password: string;
      loggedIn: boolean;
    };
    error: {
      active: boolean;
      message: string;
    };
  };
  activitiesStore: ActivitiesStore;
  contactsStore: ContactsStore;
  inventoryStore: InventoryStore;
  recipesStore: RecipeStore;
}

export type GetState = () => AppStore;