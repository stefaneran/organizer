import * as React from 'react';
import { Activity } from '@activities/types';
import { Contact, Event } from '@contacts/types';

export type InputEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export type ClickEvent = React.MouseEvent;

export interface ActivitiesStore {
  activities: Record<string, Activity>;
}

export interface ContactsStore {
  contacts: Record<string, Contact>;
  events: Record<string, Event>;
  groups: string[];
}

export interface InventoryStore {
  allItems: Record<string, any>,
  availableItems: string[],
  cart: string[],
  selectedInCart: string[]
}

export interface RecipeStore {
  recipes: Record<string, any>
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