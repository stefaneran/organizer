import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Select, MenuItem } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FilterListIconLarge } from '@core/components/Icons/ListIcon';

const useStyles = makeStyles((theme: Theme) => createStyles({
  mobileSelect: {
    marginBottom: '2em',
    fontSize: '3rem'
  },
  mobileAutocomplete: {
    marginBottom: '2em',
    fontSize: '3rem',
    '& label': {
      fontSize: '3rem'
    },
    '& > div > div': {
      fontSize: '3rem'
    }
  },
  mobileTextField: {
    marginBottom: '2em',
    '& > div': {
      fontSize: '3rem'
    }
  },
  navRight: {
    position: 'absolute',
    right: '3em',
    top: '2em'
  },
}));

interface Props {
  toggleFilterMenuOpen;
  nationalityOptions: string[];
  categoryOptions: string[];
  selectedNationality: string;
  onSelectNationality;
  selectedCategory: string;
  onSelectCategory;
  textFilter: string;
  onTextFilterInput;
}

const RecipeFilters = ({
  toggleFilterMenuOpen,
  nationalityOptions,
  categoryOptions,
  selectedNationality,
  onSelectNationality,
  selectedCategory,
  onSelectCategory,
  textFilter,
  onTextFilterInput
}: Props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.navRight} onClick={toggleFilterMenuOpen}>
        <FilterListIconLarge />
      </div>
      <Select 
        value={selectedNationality} 
        onChange={onSelectNationality}
        variant="outlined"
        className={classes.mobileSelect}
        fullWidth
      >
        <MenuItem value={'All'}>
          All
        </MenuItem>
        {nationalityOptions.map(nationality => (
          <MenuItem value={nationality}>
            {nationality}
          </MenuItem>
        ))}
      </Select>
      <Autocomplete
        options={categoryOptions}
        value={selectedCategory}
        onChange={onSelectCategory}
        getOptionLabel={(option) => option}
        className={classes.mobileAutocomplete}
        fullWidth
        renderInput={(params) => 
          <TextField 
            {...params}
            label="Category Filter"  
            size="medium" 
            variant="outlined" 
          />
        }
      />
      <TextField
        value={textFilter}
        onChange={onTextFilterInput}
        className={classes.mobileTextField}
        variant="outlined"
        size="medium"
        placeholder="Name Filter"
        fullWidth
      />
    </>
  )
}

export default RecipeFilters;