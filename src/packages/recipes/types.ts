export type EditMode = "new" | "edit" | "";

export interface RecipeFilters {
  nationality: string;
  category: string;
  name: string;
}

export interface Ingredient {
  itemId: string;
  amount: string;
}

export interface Recipe {
  id: string;
  name: string;
  nationality: string;
  category: string;
  instructions: string;
  ingredients: Ingredient[];
}

// In edit mode, ingredient will use name because user can input. 
// Later the name will be mapped to an existing or new itemId
export interface IngredientEdit {
  name: string;
  amount: string;
}

// Same as Recipe, but replace ingredients with alternate type
export interface RecipeEdit extends Omit<Recipe, "id" | "ingredients"> {
  ingredients: IngredientEdit[] 
}

export interface RecipeActions {
  addRecipe: (recipe: RecipeEdit) => void;
  editRecipe: (recipe: RecipeEdit, recipeId: string) => void;
  deleteRecipe: (recipeId: string) => void;
  addToCart: (itemIds: string[]) => void;
}