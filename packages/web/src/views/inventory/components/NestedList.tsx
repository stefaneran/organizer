import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
// Icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// Components
import InventoryListItem from 'inventory/components/InventoryListItem';
// Utils
import categorizeItems from '@core/utils/categorizeItems';
import genericSort from '@core/utils/genericSort';
import shouldCategoryBeOpen from 'inventory/utils/shouldCategoryBeOpen';
// Types
import { GroceryItem, GroceryItemEdit, RowIcon } from 'inventory/types';
import { ClickEvent } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  item: {
    paddingLeft: '1.5em'
  },
}));

const Collapsible = (props) => {

  const {
    isSelectedTab,
    category, 
    listItems,
    selectedItems, 
    onItemSelection,
    textFilter,
    rowIcons,
    onEdit,
    toggleNutrition
  } = props;

  const classes = useStyles();

  const hasSelection = Boolean(selectedItems);

  const [isOpen, setIsOpen] = React.useState(shouldCategoryBeOpen(listItems, selectedItems, hasSelection, textFilter));

  React.useEffect(() => {
    setIsOpen(shouldCategoryBeOpen(listItems, selectedItems, hasSelection, textFilter));
  }, [textFilter])

  const handleSelection = (id: string) => () => {
    const newSelected = selectedItems.includes(id) ? selectedItems.filter(itemId => itemId !== id) : [...selectedItems, id]
    onItemSelection(newSelected);
  }

  const toggleOpen = (event: ClickEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  }

  return (
    <>
      <ListItem button onClick={toggleOpen}>
        <ListItemText primary={category} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" className={classes.item}>
          {listItems && listItems.sort((a, b) => genericSort(a.name, b.name)).map(groceryItem => (
            <InventoryListItem 
              key={groceryItem.id}
              groceryItem={groceryItem}
              selectedItems={selectedItems}
              isSelectedTab={isSelectedTab}
              onSelect={handleSelection}
              rowIcons={rowIcons}
              onEdit={onEdit}
              toggleNutrition={toggleNutrition}
            />
            )
          )}
        </List>
      </Collapse>
    </>
  )
}

interface Props {
  isSelectedTab: boolean;
  groceryItems: GroceryItem[];
  selectedItems: string[];
  textFilter: string;
  rowIcons: RowIcon[];
  onItemSelection: (selected: string[]) => void;
  onEdit?: (id: string, item: GroceryItemEdit) => void;
  toggleNutrition?: (id?: string, isEdit?: boolean) => void;
}

const NestedList: React.FC<Props> = (props) => {

  const categories = React.useMemo(() => {
    return categorizeItems(props.groceryItems, "category")
  }, [props.groceryItems]);

  return (
    <List component="div" disablePadding>
      {categories && 
        Object
          .keys(categories)
          .sort((a, b) => genericSort(a, b))
          .map(category => (
            <Collapsible 
              key={category}
              category={category}
              listItems={categories[category]}
              {...props}
            />
          ))
      }
    </List>
  )
}

export default NestedList;