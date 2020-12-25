import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import NestedList from '@inventory/components/NestedList';

const allItemsToArray = (allItems) => 
  Object.keys(allItems).map(id => ({ 
    id, 
    name: allItems[id].name, 
    category: allItems[id].category  
  }))

const AllItems = ({ allItems }) => {

  const [isNested, setisNested] = React.useState(true);

  const listItems = allItemsToArray(allItems);

  return (
    <>
      <Typography variant="h5">All Items</Typography>
      {isNested ? (
        <NestedList items={listItems} />
      ) : (
        <div>Whatever</div>
      )}
    </>
  )
}

export default AllItems;