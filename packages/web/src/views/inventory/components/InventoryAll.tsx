import * as React from 'react';
import { useDispatch } from 'react-redux';
import { createItem, deleteItems, addInventory } from 'inventory/store/thunks';
// Icons
import { AddBagIconSmall } from '@core/components/Icons/BagIcon';
import { TrashIconSmall, TrashIconSmallWhite, TrashIconXS } from '@core/components/Icons/DeleteIcon';
// Components
import InventorySection from 'inventory/components/InventorySection';
import ConfirmationDialog from '@core/components/ConfirmationDialog';
// Utils
import allItemsToArray from 'inventory/utils/allItemsToArray';
// Types
import { AppDispatch } from '@core/types';
import { GroceryItemEdit } from 'inventory/types';

interface Props {
  isSelectedTab: boolean;
}

const InventoryAll: React.FC<Props> = ({ isSelectedTab }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [confirmationDialog, setConfirmationDialog] = React.useState({ isOpen: false, groceryId: '' });

  const hasSelectedItems = Boolean(selectedItems.length);

  const toggleConfirmationDialog = (id?: string) => {
    const { isOpen } = confirmationDialog;
    // From lists we receive the groceryId as an argument, but everywhere else we receive event object
    const groceryId = typeof id === 'string' ? id : '';
    // If clicked on "Delete" row action, but there are selected, clear selection so they don't all get deleted
    if (groceryId && selectedItems) {
      setSelectedItems([])
    }
    setConfirmationDialog({ isOpen: !isOpen, groceryId });
  }

  const handleAddFromAllToAvailable = (id: string) => {
    dispatch(addInventory([id]));
  }

  const handleAddNewToAll = ({ name, category, isEssential }: GroceryItemEdit) => {
    dispatch(createItem({ name, category, isEssential }));
  }

  const handleAddSelectedToAvailable = () => {
    dispatch(addInventory(selectedItems));
  }

  const handleRemoveFromAll = (groceryId?: string) => async () => {
    // Are we removing a single item
    const isSingleItem = Boolean(groceryId);
    dispatch(deleteItems(isSingleItem ? [groceryId] : selectedItems));
    setSelectedItems(isSingleItem ? selectedItems.filter(id => id !== groceryId) : []);
    toggleConfirmationDialog();
  }

  return (
    <>
      <InventorySection 
        inventoryType="all"
        isSelectedTab={isSelectedTab}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        getList={allItemsToArray}
        customRowIcons={[
          { icon: <TrashIconSmall />, handler: toggleConfirmationDialog, altIcon: <TrashIconSmallWhite /> },
          { icon: <AddBagIconSmall />, handler: handleAddFromAllToAvailable }
        ]}
        specificActions={{
          addNew: handleAddNewToAll,
          addSelectedToAvailable: handleAddSelectedToAvailable,
          removeSelected: handleRemoveFromAll()
        }}
      />
      {confirmationDialog.isOpen && (
        <ConfirmationDialog 
          isOpen 
          onClose={toggleConfirmationDialog}
          confirmationTitle={`Confirm To Delete Item ${hasSelectedItems ? 's' : ''}`}
          confirmationText={`Are you sure you want to delete ${hasSelectedItems ? 'these items' : 'this item'}?`}
          secondaryIcon={<TrashIconXS />}
          primaryText="Cancel"
          secondaryText="Delete"
          onPrimaryAction={toggleConfirmationDialog}
          onSecondaryAction={hasSelectedItems ? handleRemoveFromAll() : handleRemoveFromAll(confirmationDialog.groceryId)}
        />
      )}
    </>
  )
}

export default InventoryAll;