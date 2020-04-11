import * as React from 'react';
import { Grid, Button } from '@material-ui/core';

interface IToolBarProps {
  toolBarHandlers: {
    onOpenChooseCategory(): void;
  }
}

const CategoryListToolbar = ({ toolBarHandlers }: IToolBarProps) => {
  return (
    <>
      <Grid item>
        <Button variant="outlined" color="primary" onClick={toolBarHandlers.onOpenChooseCategory}>Add New</Button>
      </Grid>
    </>
  )
}

export default CategoryListToolbar;