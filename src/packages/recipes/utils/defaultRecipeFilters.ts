import { RecipeFilters, GroupByMode } from '@recipes/types';

const defaultRecipeFilters: RecipeFilters = {
  nationality: 'All',
  category: 'All',
  name: '',
  groupBy: GroupByMode.Category
}

export default defaultRecipeFilters;