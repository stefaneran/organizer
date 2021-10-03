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
import { InventoryItem, InventoryItemEdit, RowIcon } from 'inventory/types';
import { ClickEvent } from '@core/types';

interface Props {
  allItems?: Record<string, InventoryItemEdit>;
  availableItems?: string[];
  item: InventoryItem;
  selectedItems: string[];
  isSelectedTab: boolean;
  rowIcons?: RowIcon[];
  cart?: string[];
  onSelect: (id: string) => () => void;
  onEdit?: (id: string, item: InventoryItemEdit) => void;
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
  allItems,
  availableItems,
  item,
  selectedItems,
  isSelectedTab,
  rowIcons,
  cart,
  onSelect,
  onEdit,
  toggleNutrition
}) => {

  const [itemName, setItemName] = React.useState(item.name);
  const [itemCategory, setItemCategory] = React.useState(item.category);
  const [isEditing, setIsEditing] = React.useState(false);

  const hasSelection = Boolean(selectedItems);

  const categoryOptions = React.useMemo(() => {
    return allItems ? getCategoryOptions(itemCategory, allItems) : []
  }, [itemCategory, allItems])

  const toggleEditing = (event: ClickEvent) => {
    event.stopPropagation();
    setIsEditing(!isEditing);
  }

  const toggleEditNutrition = () => {
    toggleNutrition(item.id, true);
  }

  const handleSaveEdit = () => {
    if (onEdit) {
      const updatedItem = { 
        name: itemName, 
        category: itemCategory,
        nutrition: item.nutrition
      }
      onEdit(item.id, updatedItem);
    }
    setIsEditing(false);
  }

  const handleCancelEdit = () => {
    setItemName(item.name);
    setItemCategory(item.category);
    setIsEditing(false);
  }

  const handleIconAction = (
    id: string, 
    handler: (id: string) => void
  ) => (event: ClickEvent) => {
    event.stopPropagation();
    handler(id);
  }

  // Used only in case of AllItems
  const itemBackground = 
    (item: InventoryItem) => allItems && availableItems && cart ? getWarningColor(item, cart, availableItems) : '';

  return (
    <ListItem 
      button 
      onClick={hasSelection && !isEditing ? onSelect(item.id) : undefined}
      style={{ 
        background: itemBackground(item)
      }}
    >
      {hasSelection && isSelectedTab && !isEditing && (
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={selectedItems.includes(item.id)}
            color="primary"
          />
        </ListItemIcon>
      )}
      {isEditing ? (
        <InventoryListItemEdit 
          itemName={itemName}
          itemCategory={itemCategory}
          categoryOptions={categoryOptions}
          setItemName={setItemName}
          setItemCategory={setItemCategory}
          toggleNutrition={toggleNutrition}
        />
      ) : (
        <ListItemText primary={item.name} secondary={item.category} />
      )}
      
      <>
        {rowIcons && !isEditing ? rowIcons.map((rowIcon, index) => (
          <ListItemIcon key={`${item.id}-${index}`} onClick={handleIconAction(item.id, rowIcon.handler)}>
            {getIcon(rowIcon, itemBackground(item))}
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