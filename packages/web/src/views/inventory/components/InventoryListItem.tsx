import * as React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { ImportantIconSmall } from '@core/components/Icons/ImportantIcon';
// Components
import { ListItem, ListItemText, ListItemIcon, Checkbox, Tooltip } from '@material-ui/core';
import InventoryListItemEdit from 'inventory/components/InventoryListItemEdit';
// Utils
import getWarningColor from 'inventory/utils/getWarningColor';
import getCategoryOptions from 'inventory/utils/getCategoryOptions';
// Types
import { GroceryItem, GroceryItemEdit, RowIcon, InventoryTabs } from 'inventory/types';
import { ClickEvent, RootState } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  checkboxContainer: {
    minWidth: '35px'
  },
  essentialIcon: {
    marginRight: '0.3em',
    position: 'relative',
    left: '-0.2em'
  },
  essentialCheckbox: {
    marginRight: '0.7em'
  }
}));

interface Props {
  groceryItem: GroceryItem;
  selectedItems: string[];
  // Which tab this item is located in
  parentTab: InventoryTabs;
  isSelectedTab: boolean;
  rowIcons?: RowIcon[];
  onSelect: (id: string) => () => void;
  onEdit?: (id: string, item: GroceryItemEdit) => void;
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
  groceryItem,
  selectedItems,
  parentTab,
  isSelectedTab,
  rowIcons,
  onSelect,
  onEdit
}) => {
  const classes = useStyles();
  const { groceries, inventory, cart } = useSelector((state: RootState) => state.inventoryStore); 

  const [groceryName, setGroceryName] = React.useState(groceryItem.name);
  const [groceryCategory, setGroceryCategory] = React.useState(groceryItem.category);
  const [groceryIsEssential, setGroceryIsEssential] = React.useState(Boolean(groceryItem.isEssential))
  const [isEditing, setIsEditing] = React.useState(false);

  const hasSelection = Boolean(selectedItems);

  const categoryOptions = React.useMemo(() => {
    return groceries ? getCategoryOptions(groceryCategory, groceries) : []
  }, [groceryCategory, groceries])

  const toggleEditing = (event: ClickEvent) => {
    event.stopPropagation();
    setIsEditing(!isEditing);
  }

  const toggleEssential = () => {
    setGroceryIsEssential(!groceryIsEssential);
  }

  const handleSaveEdit = () => {
    if (onEdit) {
      const updatedItem = { 
        name: groceryName, 
        category: groceryCategory,
        isEssential: groceryIsEssential,
        nutrition: groceryItem.nutrition,
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

  const shouldHighlightItem = parentTab === InventoryTabs.Inventory;
  const itemHighlight = getWarningColor(groceryItem, cart, inventory)

  return (
    <ListItem 
      button
      onClick={hasSelection && !isEditing ? onSelect(groceryItem.id) : undefined}
      style={{ 
        background: shouldHighlightItem ? itemHighlight : ''
      }}
    >
      {hasSelection && isSelectedTab && !isEditing && (
        <ListItemIcon className={classes.checkboxContainer}>
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
        />
      ) : (
        <>
          {groceryIsEssential ? (
            <div className={classes.essentialIcon}>
              <ImportantIconSmall />
            </div>
          ) : null}
          <ListItemText primary={groceryItem.name} secondary={groceryItem.category} />
        </>
      )}
      
      <>
        {rowIcons && !isEditing ? rowIcons.map((rowIcon, index) => (
          <ListItemIcon key={`${groceryItem.id}-${index}`} onClick={handleIconAction(groceryItem.id, rowIcon.handler)}>
            {getIcon(rowIcon, itemHighlight)}
          </ListItemIcon>
        )) : null}
        {onEdit && !isEditing ? (
          <ListItemIcon onClick={toggleEditing}>
            <EditIcon style={{ color: '#3f51b5' }} />
          </ListItemIcon>
        ) : null}
        {isEditing ? (
          <>
            <Tooltip title="Mark as essential">
              <Checkbox
                className={classes.essentialCheckbox}
                checked={groceryIsEssential || false}
                onClick={toggleEssential}
                color="primary"
              />
            </Tooltip>
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