import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemIcon, Checkbox, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { TrashIconSmall, TrashIconSmallWhite } from '@core/components/Icons/DeleteIcon';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import getWarningColor from '@inventory/utils/getWarningColor';
import getCategoryOptions from '@inventory/utils/getCategoryOptions';

const useStyles = makeStyles((theme: Theme) => createStyles({
  editContainer: {
    '& > span': {
      display: 'flex'
    }
  },
  nameInput: {
    width: '160px', 
    marginRight: '1em'
  },
  categoryInput: {
    width: '160px'
  }
}))

const getIcon = (iconAction, background) => {
  // Dirty exception for Delete icon in items with red background
  if (iconAction.isDelete && background === 'rgb(255, 89, 100)') {
    return <TrashIconSmallWhite />
  } else if (iconAction.isDelete) {
    return <TrashIconSmall />
  }
  const { icon } = iconAction;
  return icon;
}

const CustomListItem = ({
  availableItems,
  cart,
  allItems,
  item,
  selectedItems,
  hasSelection,
  isSelectedTab,
  onSelect,
  iconActions,
  onEdit
}) => {

  const classes = useStyles();

  const [itemName, setItemName] = React.useState(item.name);
  const [itemCategory, setItemCategory] = React.useState(item.category);
  const [isEditing, setIsEditing] = React.useState(false);

  const shouldCheckAvailable = Boolean(availableItems);
  const categoryOptions = allItems ? getCategoryOptions(itemCategory, allItems) : [];

  const toggleEditing = (e) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  }
  const handleChangeName = (e) => {
    setItemName(e.target.value);
  }
  const handleCategorySelect = (e, newValue) => {
    if (newValue) {
      setItemCategory(newValue);
    }
  }
  const handleCategoryInput = (e) => {
    setItemCategory(e.target.value);
  }
  const handleSaveEdit = () => {
    onEdit(item.id, { name: itemName, category: itemCategory });
  }
  const handleCancelEdit = () => {
    setItemName(item.name);
    setItemCategory(item.category);
    setIsEditing(false);
  }
  const handleIconAction = (id, handler) => (e) => {
    e.stopPropagation();
    handler(id);
  }

  // Used only in case of AllItems
  const itemBackground = (item) => shouldCheckAvailable ? getWarningColor(item, cart, availableItems) : '';

  return (
    <ListItem 
      key={item.id}
      button 
      onClick={hasSelection && !isEditing ? onSelect(item.id) : undefined}
      style={{ 
        background: itemBackground(item)
      }}
    >
      {hasSelection && isSelectedTab && (
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={selectedItems.includes(item.id)}
            color="primary"
          />
        </ListItemIcon>
      )}
      {isEditing ? (
        <ListItemText className={classes.editContainer}>
          <TextField
            className={classes.nameInput}
            value={itemName}
            onChange={handleChangeName}
            variant="outlined"
            size="small"
            placeholder="Name"
          />
          <Autocomplete
            className={classes.categoryInput}
            value={itemCategory}
            options={categoryOptions}
            onChange={handleCategorySelect}
            getOptionLabel={(option) => option}
            noOptionsText={<></>}
            renderInput={(params) => 
              <TextField 
                {...params} 
                onChange={handleCategoryInput} 
                placeholder="Category"  
                size="small" 
                variant={'outlined'} 
              />
            }
          />
        </ListItemText>
      ) : (
        <ListItemText primary={item.name} secondary={item.category} />
      )}
      
      <>
      {iconActions && !isEditing ? iconActions.map((iconAction, index) => (
        <ListItemIcon key={`${item.id}-${index}`} onClick={handleIconAction(item.id, iconAction.handler)}>
          {getIcon(iconAction, itemBackground(item))}
        </ListItemIcon>
      )) : null}
      {onEdit && !isEditing ? (
        <ListItemIcon onClick={toggleEditing}>
          <EditIcon style={{ color: '#3f51b5' }} />
        </ListItemIcon>
      ) : null}
      {isEditing ? (
        <>
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

export default CustomListItem;