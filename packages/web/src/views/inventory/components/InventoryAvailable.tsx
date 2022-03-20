import * as React from 'react';
import { RemoveBagIconSmall } from '@core/components/Icons/BagIcon';
import InventorySection from 'inventory/components/InventorySection';
import availableItemsToArray from 'inventory/utils/availableItemsToArray';
import { InventoryActions, GroceryItemEdit } from 'inventory/types';

interface Props {
  groceries: Record<string, GroceryItemEdit>;
  inventory: string[];
  isSelectedTab: boolean;
  actions: InventoryActions;
}

const InventoryAvailable: React.FC<Props> = ({
  groceries,
  inventory,
  isSelectedTab,
  actions
}) => {

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleRemove = (groceryId: string) => {
    actions.inventory.remove([groceryId]);
    setSelectedItems(selectedItems.filter(id => id !== groceryId));
  }
  const handleRemoveSelected = () => {
    actions.inventory.remove(selectedItems);
    setSelectedItems([]);
  }

  return (
    <InventorySection 
      inventoryType="available"
      isSelectedTab={isSelectedTab}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      groceries={groceries}
      inventory={inventory}
      actions={actions}
      getList={availableItemsToArray}
      customRowIcons={[
        { icon: <RemoveBagIconSmall />, handler: handleRemove }
      ]}
      specificActions={{
        removeSelected: handleRemoveSelected
      }}
    />
  )
}

export default InventoryAvailable;