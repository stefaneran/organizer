import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import NestedList from '@inventory/components/NestedList';

const availableItemsToArray = (availableItems, allItems) => 
  availableItems.map(id => ({ 
    id, 
    name: allItems[id].name, 
    category: allItems[id].category  
  }))

const AvailableItems = ({ allItems, availableItems, nested }) => {

  const listItems = availableItemsToArray(availableItems, allItems);

  return (
    <>
      <Typography variant="h5">Available</Typography>
      {nested ? (
        <NestedList items={listItems} />
      ) : (
        <div>Whatever</div>
      )}
    </>
  )
}

export default AvailableItems;