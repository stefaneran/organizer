import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, FormControlLabel, Switch, Divider } from '@material-ui/core';
import AvailableItems from '@inventory/components/AvailableItems';
import AllItems from '@inventory/components/AllItems';
import AddItemInput from '@inventory/components/AddItemInput';
import InventoryTabs from '@inventory/interfaces/InventoryTabs.enum';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: '1em',
    display: 'inline-block',
    overflowX: 'hidden',
    overflowY: 'auto',
    transition: 'width 300ms'
  },
  title: {
    cursor: 'pointer'
  },
  availableContainer: {
    display: 'flex'
  }
}))

const Inventory = ({ allItems, availableItems, actions, selected, setSelected }) => {
  const classes = useStyles();

  const [isNested, setIsNested] = React.useState(true);

  const toggleNested = () => setIsNested(!isNested);

  return (
    <div 
      className={classes.container} 
      style={{ 
        width: selected ? '80%' : '20%',
        background: selected ? '' : 'rgba(0, 0, 0, 0.05)'
      }}
    >
      <Typography 
        variant="h4" 
        className={classes.title} 
        onClick={setSelected(InventoryTabs.Inventory)}
      >
        Inventory
      </Typography>
      <div className={classes.availableContainer}>
        <div style={{ flexGrow: selected ? 3 : 1 }}>
          <AvailableItems 
            allItems={allItems} 
            availableItems={availableItems} 
            nested={isNested}
          />
          <AddItemInput allItems={allItems} onSubmit={() => {}} />
        </div>
        <Divider orientation="vertical" />
        {selected && (
          <div style={{ flexGrow: 1 }}>
            <FormControlLabel 
              label="Nested List"
              control={
                <Switch 
                  checked={isNested} 
                  onChange={toggleNested} 
                  color="primary" 
                />
              }
            />
          </div>
        )}
      </div>
      <AllItems allItems={allItems} />
    </div>
  )
}

export default Inventory;