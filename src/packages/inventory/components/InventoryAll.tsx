import * as React from 'react';
import { AddBagIconSmall } from '@core/components/Icons/BagIcon';
import { TrashIconSmall, TrashIconSmallWhite, TrashIconXS } from '@core/components/Icons/DeleteIcon';
import InventorySection from 'inventory/components/InventorySection';
import ConfirmationDialog from '@core/components/ConfirmationDialog';
import allItemsToArray from 'inventory/utils/allItemsToArray';
import { InventoryActions, InventoryItemEdit } from 'inventory/types';

interface Props {
  allItems: Record<string, InventoryItemEdit>;
  availableItems: string[];
  cart: string[];
  isSelectedTab: boolean;
  actions: InventoryActions;
}

const InventoryAll: React.FC<Props> = ({
  allItems,
  availableItems,
  cart,
  isSelectedTab,
  actions
}) => {

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [isConfirmationOpen, setConfirmationOpen] = React.useState({ isOpen: false, itemId: '' });

  const hasSelectedItems = Boolean(selectedItems.length);

  const toggleConfirmationDialog = (id?: string) => {
    const { isOpen } = isConfirmationOpen;
    // From lists we receive the itemId as an argument, but everywhere else we receive event object
    const itemId = typeof id === 'string' ? id : '';
    // If clicked on "Delete" row action, but there are selected, clear selection so they don't all get deleted
    if (itemId && selectedItems) {
      setSelectedItems([])
    }
    setConfirmationOpen({ isOpen: !isOpen, itemId });
  }
  const handleAddToAvailable = (id: string) => {
    actions.inventory.addToAvailable([id]);
  }
  const handleAddNew = ({ name, category }: Record<string, string>) => {
    actions.inventory.addToAll({ name, category });
  }
  const handleAddSelectedToAvailable = () => {
    actions.inventory.addToAvailable(selectedItems);
  }
  const handleRemove = (itemId?: string) => async () => {
    // Are we removing a single item
    const isSingleItem = Boolean(itemId);
    actions.inventory.removeFromAll(isSingleItem ? [itemId] : selectedItems);
    setSelectedItems(isSingleItem ? selectedItems.filter(id => id !== itemId) : []);
    toggleConfirmationDialog();
  }

  return (
    <>
      <InventorySection 
        inventoryType="all"
        isSelectedTab={isSelectedTab}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        allItems={allItems}
        availableItems={availableItems}
        cart={cart}
        actions={actions}
        getList={allItemsToArray}
        customRowIcons={[
          { icon: <TrashIconSmall />, handler: toggleConfirmationDialog, altIcon: <TrashIconSmallWhite /> },
          { icon: <AddBagIconSmall />, handler: handleAddToAvailable }
        ]}
        specificActions={{
          addNew: handleAddNew,
          addSelectedToAvailable: handleAddSelectedToAvailable,
          removeSelected: handleRemove()
        }}
      />
      {isConfirmationOpen.isOpen && (
        <ConfirmationDialog 
          isOpen 
          onClose={toggleConfirmationDialog}
          confirmationTitle={`Confirm To Delete Item${hasSelectedItems ? 's' : ''}`}
          confirmationText={`Are you sure you want to delete ${hasSelectedItems ? 'these items' : 'this item'}?`}
          secondaryIcon={<TrashIconXS />}
          primaryText="Cancel"
          secondaryText="Delete"
          onPrimaryAction={toggleConfirmationDialog}
          onSecondaryAction={hasSelectedItems ? handleRemove() : handleRemove(isConfirmationOpen.itemId)}
        />
      )}
    </>
  )
}

export default InventoryAll;