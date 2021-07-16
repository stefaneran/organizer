import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import InventoryListItem from 'inventory/components/InventoryListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import categorizeItems from 'core/utils/categorizeItems';
import genericSort from 'core/utils/genericSort';
import shouldCategoryBeOpen from 'inventory/utils/shouldCategoryBeOpen';
import { InventoryItem, RowIcon } from 'inventory/types';
import { ClickEvent } from 'core/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  item: {
    paddingLeft: '1.5em'
  },
}));

interface CollapsibleProps {
  isSelectedTab: boolean;
  category: string;
  listItems: InventoryItem[];
  allItems: Record<string, InventoryItem>;
  availableItems: string[];
  selectedItems: string[];
  onItemSelection: (selected: string[]) => void;
  textFilter: string;
  rowIcons: RowIcon[];
  cart?: string[];
  onEdit?: (id: string, item: Omit<InventoryItem, "id">) => void;
}

const Collapsible: React.FC<CollapsibleProps> = ({ 
  isSelectedTab,
  category, 
  listItems, 
  allItems,
  availableItems,
  selectedItems, 
  onItemSelection,
  textFilter,
  rowIcons,
  cart,
  onEdit
}) => {

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
          {listItems && listItems.sort((a, b) => genericSort(a.name, b.name)).map(item => (
            <InventoryListItem 
              key={item.id}
              allItems={allItems}
              availableItems={availableItems}
              cart={cart}
              item={item}
              selectedItems={selectedItems}
              isSelectedTab={isSelectedTab}
              onSelect={handleSelection}
              rowIcons={rowIcons}
              onEdit={onEdit}
            />
            )
          )}
        </List>
      </Collapse>
    </>
  )
}

interface NestedProps {
  isSelectedTab: boolean;
  listItems: InventoryItem[];
  allItems: Record<string, InventoryItem>;
  availableItems: string[];
  selectedItems: string[];
  onItemSelection: (selected: string[]) => void;
  textFilter: string;
  rowIcons: RowIcon[];
  cart?: string[];
  onEdit?: (id: string, item: Omit<InventoryItem, "id">) => void;
}

const NestedList: React.FC<NestedProps> = ({ 
  isSelectedTab,
  listItems, 
  allItems,
  availableItems, 
  selectedItems, 
  onItemSelection,
  textFilter,
  rowIcons,
  cart,
  onEdit
}) => {
  const categories = React.useMemo(() => categorizeItems(listItems, "category"), [listItems]);
  return (
    <List component="div" disablePadding>
      {categories && Object.keys(categories).sort((a, b) => genericSort(a, b)).map(category => (
        <Collapsible 
          key={category}
          isSelectedTab={isSelectedTab}
          category={category} 
          listItems={categories[category]} 
          allItems={allItems}
          availableItems={availableItems} 
          cart={cart}
          selectedItems={selectedItems}
          onItemSelection={onItemSelection}
          rowIcons={rowIcons}
          textFilter={textFilter}
          onEdit={onEdit}
        />
      ))}
    </List>
  )
}

export default NestedList;