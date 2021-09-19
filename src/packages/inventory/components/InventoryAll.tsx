import * as React from 'react';
// Icons
import { AddBagIconSmall } from '@core/components/Icons/BagIcon';
import { TrashIconSmall, TrashIconSmallWhite, TrashIconXS } from '@core/components/Icons/DeleteIcon';
// Components
import InventorySection from 'inventory/components/InventorySection';
import NutritionEditDialog from 'inventory/components/NutritionEditDialog';
import ConfirmationDialog from '@core/components/ConfirmationDialog';
// Utils
import allItemsToArray from 'inventory/utils/allItemsToArray';
// Types
import { InventoryActions, InventoryItemEdit, NutritionalInfo } from 'inventory/types';

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
  const [confirmationDialog, setConfirmationDialog] = React.useState({ isOpen: false, itemId: '' });
  const [nutritionDialog, setNutritionDialog] = React.useState({ isOpen: false, itemId: '', isEdit: false });

  const hasSelectedItems = Boolean(selectedItems.length);

  const toggleConfirmationDialog = (id?: string) => {
    const { isOpen } = confirmationDialog;
    // From lists we receive the itemId as an argument, but everywhere else we receive event object
    const itemId = typeof id === 'string' ? id : '';
    // If clicked on "Delete" row action, but there are selected, clear selection so they don't all get deleted
    if (itemId && selectedItems) {
      setSelectedItems([])
    }
    setConfirmationDialog({ isOpen: !isOpen, itemId });
  }

  const toggleNutritionDialog = (id?: string, isEdit?: boolean) => {
    const { isOpen } = nutritionDialog;
    const itemId = typeof id === 'string' ? id : '';
    setNutritionDialog({ isOpen: !isOpen, itemId, isEdit: Boolean(isEdit) })
  }

  const handleSaveNutrition = (itemId: string, nutrition: NutritionalInfo[]) => {
    const item = allItems[itemId];
    actions.inventory.edit(itemId, { ...item, id: itemId, nutrition })
    toggleNutritionDialog();
  }

  const handleAddFromAllToAvailable = (id: string) => {
    actions.inventory.addToAvailable([id]);
  }

  const handleAddNewToAll = ({ name, category }: Record<string, string>) => {
    actions.inventory.addToAll({ name, category, nutrition: [] });
  }

  const handleAddSelectedToAvailable = () => {
    actions.inventory.addToAvailable(selectedItems);
  }

  const handleRemoveFromAll = (itemId?: string) => async () => {
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
          { icon: <AddBagIconSmall />, handler: handleAddFromAllToAvailable }
        ]}
        specificActions={{
          addNew: handleAddNewToAll,
          addSelectedToAvailable: handleAddSelectedToAvailable,
          removeSelected: handleRemoveFromAll(),
          toggleNutrition: toggleNutritionDialog
        }}
      />
      {confirmationDialog.isOpen && (
        <ConfirmationDialog 
          isOpen 
          onClose={toggleConfirmationDialog}
          confirmationTitle={`Confirm To Delete Item${hasSelectedItems ? 's' : ''}`}
          confirmationText={`Are you sure you want to delete ${hasSelectedItems ? 'these items' : 'this item'}?`}
          secondaryIcon={<TrashIconXS />}
          primaryText="Cancel"
          secondaryText="Delete"
          onPrimaryAction={toggleConfirmationDialog}
          onSecondaryAction={hasSelectedItems ? handleRemoveFromAll() : handleRemoveFromAll(confirmationDialog.itemId)}
        />
      )}
      {nutritionDialog.isOpen && (
        <NutritionEditDialog
          isOpen
          allItems={allItems}
          itemId={nutritionDialog.itemId}
          onClose={toggleNutritionDialog}
          onSave={handleSaveNutrition}
        />
      )}
    </>
  )
}

export default InventoryAll;