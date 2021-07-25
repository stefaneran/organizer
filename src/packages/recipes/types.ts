export type EditMode = "new" | "edit" | "";

export enum GroupByMode {
  Nationality = 'Nationality',
  Category = 'Category'
}

export interface RecipeFilters {
  nationality: string;
  category: string;
  name: string;
  groupBy: GroupByMode;
  availableOnly: boolean;
}

export interface AlternativeIngredient {
  itemId: string;
  name: string;
  amount: string;
}

export interface Ingredient {
  itemId: string;
  name: string;
  amount: string;
  isOptional: boolean;
  alternatives: AlternativeIngredient[];
}

export interface Recipe {
  id: string;
  name: string;
  nationality: string;
  category: string;
  instructions: string;
  ingredients: Ingredient[];
}

export interface RecipeActions {
  addRecipe: (recipe: RecipeEdit) => void;
  editRecipe: (recipe: RecipeEdit, recipeId: string) => void;
  deleteRecipe: (recipeId: string) => void;
  addToCart: (itemIds: string[]) => void;
}

// Types for edit-mode objects (omitting itemIds since they're not known/not existing at the time of edit)
// We use "name" instead and then on submit we map it to itemId or create a new item if it doesn't exist 

export type AlternativeIngredientEdit = Omit<AlternativeIngredient, "itemId">;

// Same as AlternativeIngredientEdit above
export interface IngredientEdit extends Omit<Ingredient, "itemId" | "alternatives"> {
  alternatives: AlternativeIngredientEdit[];
}

export interface RecipeEdit extends Omit<Recipe, "id" | "ingredients"> {
  ingredients: IngredientEdit[] 
}

export interface IngredientChange {
  recipeId: string;
  itemId: string;
  updatedIngredient: Ingredient;
}