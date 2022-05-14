import * as React from 'react';
import { useDispatch } from 'react-redux';
import { removeInventory } from 'inventory/store/thunks';
// Icons
import { RemoveBagIconSmall } from '@core/components/Icons/BagIcon';
// Components
import InventorySection from 'inventory/components/InventorySection';
// Utils
import availableItemsToArray from 'inventory/utils/availableItemsToArray';
// Types
import { AppDispatch } from '@core/types';

interface Props {
  isSelectedTab: boolean;
}

const InventoryAvailable: React.FC<Props> = ({ isSelectedTab }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleRemove = (groceryId: string) => {
    dispatch(removeInventory([groceryId]));
    setSelectedItems(selectedItems.filter(id => id !== groceryId));
  }
  const handleRemoveSelected = () => {
    dispatch(removeInventory(selectedItems));
    setSelectedItems([]);
  }

  return (
    <InventorySection 
      inventoryType="available"
      isSelectedTab={isSelectedTab}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
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