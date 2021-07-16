import * as React from 'react';
import { RemoveBagIconSmall } from 'core/components/Icons/BagIcon';
import InventorySection from 'inventory/components/InventorySection';
import availableItemsToArray from 'inventory/utils/availableItemsToArray';
import { InventoryActions, InventoryItem } from 'inventory/types';

interface Props {
  allItems: Record<string, InventoryItem>;
  availableItems: string[];
  isSelectedTab: boolean;
  actions: InventoryActions;
}

const InventoryAvailable: React.FC<Props> = ({
  allItems,
  availableItems,
  isSelectedTab,
  actions
}) => {

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleRemove = (itemId: string) => {
    actions.inventory.removeFromAvailable([itemId]);
    setSelectedItems(selectedItems.filter(id => id !== itemId));
  }
  const handleRemoveSelected = () => {
    actions.inventory.removeFromAvailable(selectedItems);
    setSelectedItems([]);
  }

  return (
    <InventorySection 
      inventoryType="available"
      isSelectedTab={isSelectedTab}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      allItems={allItems}
      availableItems={availableItems}
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