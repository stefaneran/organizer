import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  select: {
    width: '160px', 
    marginRight: '1em', 
    height: '2.5em',
    '& > div': {
      paddingTop: '0',
      paddingBottom: '0'
    }
  }
}))

const CategoryFilter = ({ selectedCategory, categoryOptions, onSelectCategory }) => {
  const classes = useStyles();
  return (
    <Select 
      className={classes.select}
      value={selectedCategory} 
      onChange={onSelectCategory}
      variant="outlined"
      fullWidth
    >
      <MenuItem value={'All'}>
        All
      </MenuItem>
      {categoryOptions.map(category => (
        <MenuItem key={category} value={category}>
          {category}
        </MenuItem>
      ))}
    </Select>
  )
}

export default CategoryFilter;

