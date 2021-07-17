import { connect, ConnectedProps } from 'react-redux';
import { addToCart } from 'inventory/store/thunks';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  recipes: state.recipesStore.recipes,
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart
});

const mapDispatchToProps = {
  addToCart
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;