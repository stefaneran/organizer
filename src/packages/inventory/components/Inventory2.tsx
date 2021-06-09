import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  List, ListItem, ListItemText, ListItemIcon, Collapse,
  Switch, Button, Divider, Tooltip, TextField
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { AddCartIconXS, AddCartIconSmall } from '@core/components/Icons/CartIcon';
import { AddBagIconXS, AddBagIconSmall } from '@core/components/Icons/BagIcon';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import { DatabaseIconSmall } from '@core/components/Icons/DatabaseIcon';
import { ListIconSmall, NestedIconSmall } from '@core/components/Icons/ListIcon';
import SwitchInput from '@core/components/inputs/SwitchInput';
import NestedList from '@inventory/components/NestedList';
import SimpleList from '@inventory/components/SimpleList';
import AddNewItemInput from '@inventory/components/AddNewItemInput';
import { ConfirmationDialog } from '@core/components/ConfirmationDialog';

const useStyles = makeStyles((theme: Theme) => createStyles({
  listContainer: {
    display: 'flex'
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  button: {
    margin: 'auto',
    marginTop: '1.5em'
  },
  divider: {
    margin: '1em'
  },
  filter: {
    paddingLeft: '1em'
  },
  switchContainer: {
    justifyContent: 'center',
    '& > svg': {
      position: 'relative',
      top: '8px'
    }
  },
  controlsSwitch: {
    width: '4%',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.05)'
    }
  },
  chevron: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  controlsContainer: {
    transition: 'width 300ms',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
  }
}));

const Inventory = ({
  isSelectedTab,
  allItems, 
  availableItems,
  actions.
  getList
}) => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [textFilter, setTextFilter] = React.useState('');
  // Should group items by category
  const [isNested, setIsNested] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isControlsOpen, setIsControlsOpen] = React.useState(true);

  const listItems = React.useMemo(() => getList, [/* TODO */]);
  const hasSelectedItems = Boolean(selectedItems.length);

  const toggleOpen = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen)
  }
  const toggleControlsOpen = () => {
    setIsControlsOpen(!isControlsOpen);
  }
  const toggleNested = () => {
    setIsNested(!isNested);
  }
  const handleItemSelection = (newSelected) => {
    setSelectedItems(newSelected);
  }
  const handleTextFilterInput = (event) => {
    setTextFilter(event.target.value)
  }
  const handleAddSelectedToCart = () => {
    actions.cart.add(selectedItems)
  }
  const handleAddToAvailable = (id) => {
    actions.inventory.addToAvailable([id]);
  }
  const handleAddToCart = (id) => {
    actions.cart.add([id]);
  }

  return (
    <div className={classes.listContainer}>
      <div 
        style={{ 
          transition: 'width 300ms',
          width: isSelectedTab && isOpen && isControlsOpen ? '62%' : '100%' 
        }}
      >
        <List component="div" disablePadding>
          <ListItem button onClick={toggleOpen} className={classes.title}>
            <ListItemIcon>
              {true ? <DatabaseIconSmall /> : <BagIconSmall />}
            </ListItemIcon>
            <ListItemText primary={"All items"} />
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpen} timeout="auto" unmountOnExit></Collapse>

  )
}