import * as React from 'react';
import { ListItem, ListItemText, ListItemIcon, Checkbox, Tooltip } from '@material-ui/core';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
// Components
import InventoryListItemEdit from 'inventory/components/InventoryListItemEdit';
// Utils
import getWarningColor from 'inventory/utils/getWarningColor';
import getCategoryOptions from 'inventory/utils/getCategoryOptions';
// Types
import { GroceryItem, GroceryItemEdit, RowIcon } from 'inventory/types';
import { ClickEvent } from '@core/types';

interface Props {
  groceries?: Record<string, GroceryItemEdit>;
  inventory?: string[];
  groceryItem: GroceryItem;
  selectedItems: string[];
  isSelectedTab: boolean;
  rowIcons?: RowIcon[];
  cart?: string[];
  onSelect: (id: string) => () => void;
  onEdit?: (id: string, item: GroceryItemEdit) => void;
  toggleNutrition?: (id?: string, isEdit?: boolean) => void;
}

const getIcon = (
  rowIcon: RowIcon, 
  background: string
): JSX.Element => {
  // An exception for if item with red background
  if (rowIcon.altIcon && background === 'rgb(255, 89, 100)') {
    return rowIcon.altIcon;
  }
  return rowIcon.icon;
}

const InventoryListItem: React.FC<Props> = ({
  groceries,
  inventory,
  groceryItem,
  selectedItems,
  isSelectedTab,
  rowIcons,
  cart,
  onSelect,
  onEdit,
  toggleNutrition
}) => {

  const [groceryName, setGroceryName] = React.useState(groceryItem.name);
  const [groceryCategory, setGroceryCategory] = React.useState(groceryItem.category);
  const [isEditing, setIsEditing] = React.useState(false);

  const hasSelection = Boolean(selectedItems);

  const categoryOptions = React.useMemo(() => {
    return groceries ? getCategoryOptions(groceryCategory, groceries) : []
  }, [groceryCategory, groceries])

  const toggleEditing = (event: ClickEvent) => {
    event.stopPropagation();
    setIsEditing(!isEditing);
  }

  const toggleEditNutrition = () => {
    toggleNutrition(groceryItem.id, true);
  }

  const handleSaveEdit = () => {
    if (onEdit) {
      const updatedItem = { 
        name: groceryName, 
        category: groceryCategory,
        nutrition: groceryItem.nutrition
      }
      onEdit(groceryItem.id, updatedItem);
    }
    setIsEditing(false);
  }

  const handleCancelEdit = () => {
    setGroceryName(groceryItem.name);
    setGroceryCategory(groceryItem.category);
    setIsEditing(false);
  }

  const handleIconAction = (
    id: string, 
    handler: (id: string) => void
  ) => (event: ClickEvent) => {
    event.stopPropagation();
    handler(id);
  }

  // Used only in case of groceries
  const itemBackground = 
    (groceryItem: GroceryItem) => groceries && inventory && cart ? getWarningColor(groceryItem, cart, inventory) : '';

  return (
    <ListItem 
      button 
      onClick={hasSelection && !isEditing ? onSelect(groceryItem.id) : undefined}
      style={{ 
        background: itemBackground(groceryItem)
      }}
    >
      {hasSelection && isSelectedTab && !isEditing && (
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={selectedItems.includes(groceryItem.id)}
            color="primary"
          />
        </ListItemIcon>
      )}
      {isEditing ? (
        <InventoryListItemEdit 
          groceryName={groceryName}
          groceryCategory={groceryCategory}
          categoryOptions={categoryOptions}
          setGroceryName={setGroceryName}
          setGroceryCategory={setGroceryCategory}
          toggleNutrition={toggleNutrition}
        />
      ) : (
        <ListItemText primary={groceryItem.name} secondary={groceryItem.category} />
      )}
      
      <>
        {rowIcons && !isEditing ? rowIcons.map((rowIcon, index) => (
          <ListItemIcon key={`${groceryItem.id}-${index}`} onClick={handleIconAction(groceryItem.id, rowIcon.handler)}>
            {getIcon(rowIcon, itemBackground(groceryItem))}
          </ListItemIcon>
        )) : null}
        {onEdit && !isEditing ? (
          <ListItemIcon onClick={toggleEditing}>
            <EditIcon style={{ color: '#3f51b5' }} />
          </ListItemIcon>
        ) : null}
        {isEditing ? (
          <>
            <ListItemIcon onClick={toggleEditNutrition}>
              <Tooltip title="Add Nutritional Info">
                <PlaylistAddIcon style={{ color: '#3f51b5' }} />
              </Tooltip>
            </ListItemIcon>
            <ListItemIcon onClick={handleSaveEdit}>
              <CheckIcon style={{ color: '#3f51b5' }} />
            </ListItemIcon>
            <ListItemIcon onClick={handleCancelEdit}>
              <CloseIcon />
            </ListItemIcon>
          </>
        ) : null}
      </>
    </ListItem>
  )
}

export default InventoryListItem;