import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
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
  }
}))

const Cart = ({ cart, actions, selected, setSelected }) => {
  const classes = useStyles();

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
        onClick={setSelected(InventoryTabs.Cart)}
      >
        Cart
      </Typography>
    </div>
  )
}

export default Cart;